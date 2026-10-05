const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");

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
