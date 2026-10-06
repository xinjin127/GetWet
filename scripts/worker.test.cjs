const { test } = require("node:test");
const assert = require("node:assert/strict");
const { mkdtemp, cp, writeFile, rm } = require("node:fs/promises");
const { tmpdir } = require("node:os");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

test("Sites worker serves upstream data when the default Cache API is forbidden", async () => {
  const dir = await mkdtemp(path.join(tmpdir(), "launch-worker-test-"));
  const originalFetch = global.fetch;
  const originalCaches = Object.getOwnPropertyDescriptor(global, "caches");
  let calls = 0;
  try {
    await cp(path.resolve(__dirname, "../worker/index.mjs"), path.join(dir, "index.mjs"));
    await cp(path.resolve(__dirname, "../app/api/fetch/route.js"), path.join(dir, "api.mjs"));
    await writeFile(path.join(dir, "assets.mjs"), "export default {};\n");
    Object.defineProperty(global, "caches", { configurable: true, value: {
      get default() { throw new Error("This Worker is not permitted to access the default cache."); }
    } });
    global.fetch = async () => { calls++; return Response.json({ predictions: [{ t: "2026-10-10 00:00", v: "1.0" }] }); };
    const { default: worker } = await import(pathToFileURL(path.join(dir, "index.mjs")));
    const request = new Request("https://app.test/api/fetch?url=https://api.tidesandcurrents.noaa.gov/regression-test");
    const first = await worker.fetch(request, {}, {});
    assert.equal(first.status, 200);
    assert.equal(first.headers.get("x-launch-cache"), "MISS");
    assert.equal((await first.json()).predictions.length, 1);
    const second = await worker.fetch(request, {}, {});
    assert.equal(second.status, 200);
    assert.equal(second.headers.get("x-launch-cache"), "HIT");
    assert.equal(calls, 1);
  } finally {
    global.fetch = originalFetch;
    if (originalCaches) Object.defineProperty(global, "caches", originalCaches);
    else delete global.caches;
    delete global.launchWindowFetchCache;
    await rm(dir, { recursive: true, force: true });
  }
});
