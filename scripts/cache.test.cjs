const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

test("rate-limited Open-Meteo uses direct fetch without falling back for unrelated sources", async () => {
  const source = fs.readFileSync(require.resolve("../script.js"), "utf8").split('document.querySelector(".mode-tabs").addEventListener')[0];
  const calls = [];
  const context = vm.createContext({
    URL, URLSearchParams, AbortController, Date,
    window: { location: { protocol: "https:", hostname: "test.chatgpt.site" }, setTimeout, clearTimeout },
    fetch: async (url) => {
      calls.push(url);
      return url.startsWith("/api/fetch") ? new Response("rate limited", { status: 429 }) : Response.json({ hourly: {} });
    }
  });
  vm.runInContext(source, context);
  await vm.runInContext("fetchJson('https://api.open-meteo.com/v1/forecast')", context);
  assert.equal(calls.length, 2);
  assert.equal(calls[1], "https://api.open-meteo.com/v1/forecast");
  await assert.rejects(vm.runInContext("fetchText('https://wildlife.ca.gov/Fishing/Ocean')", context), /429/);
  assert.equal(calls.length, 3);
});

test("server cache reuses success, never stores upstream errors, and rejects unrelated hosts", async () => {
  const source = fs.readFileSync(require.resolve("../app/api/fetch/route.js"), "utf8");
  const { GET } = await import(`data:text/javascript;base64,${Buffer.from(source).toString("base64")}`);
  const original = global.fetch;
  let calls = 0;
  global.fetch = async () => { calls++; return new Response("real-source-shape-test", { status: 200 }); };
  try {
    const request = new Request("https://app.test/api/fetch?url=" + encodeURIComponent("https://api.weather.gov/test-cache"));
    assert.equal((await GET(request)).headers.get("x-launch-cache"), "MISS");
    assert.equal((await GET(request)).headers.get("x-launch-cache"), "HIT");
    assert.equal(calls, 1);
    global.fetch = async () => { calls++; return new Response("rate limited", { status: 429 }); };
    const bad = new Request("https://app.test/api/fetch?url=" + encodeURIComponent("https://api.weather.gov/test-failure"));
    assert.equal((await GET(bad)).headers.get("cache-control"), "no-store");
    await GET(bad);
    assert.equal(calls, 3);
    assert.equal((await GET(new Request("https://app.test/api/fetch?url=https://example.com"))).status, 502);
    assert.equal(calls, 3);
  } finally {
    global.fetch = original;
    delete globalThis.launchWindowFetchCache;
  }
});

test("hazard and legal feeds expire sooner than forecast data", async () => {
  const source = fs.readFileSync(require.resolve('../app/api/fetch/route.js'),'utf8') + '\n// freshness test';
  const cache = new Map();
  globalThis.launchWindowFetchCache = cache;
  const {GET} = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);
  const original = global.fetch;
  global.fetch = async () => new Response('updated');
  try {
    for (const [url,minutes,expected] of [
      ['https://api.weather.gov/alerts/active?point=test',4,'HIT'],
      ['https://api.weather.gov/alerts/active?point=test',6,'MISS'],
      ['https://wildlife.ca.gov/Fishing/Ocean/Health-Advisories',16,'MISS'],
      ['https://api.open-meteo.com/v1/forecast?test=ttl',120,'HIT']
    ]) {
      cache.set(url,{savedAt:new Date(Date.now()-minutes*60000).toISOString(),body:new TextEncoder().encode('cached').buffer,status:200,contentType:'text/plain'});
      const response = await GET(new Request('https://app.test/api/fetch?url='+encodeURIComponent(url)));
      assert.equal(response.headers.get('x-launch-cache'),expected,`${url}: ${minutes} minutes`);
    }
  } finally {
    global.fetch=original;
    delete globalThis.launchWindowFetchCache;
  }
});
