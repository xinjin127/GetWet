const crypto = require("node:crypto");
const fs = require("node:fs/promises");
const http = require("node:http");
const path = require("node:path");
const { URL } = require("node:url");

const ROOT = __dirname;
const PORT = Number(process.env.PORT || 5173);
const CACHE_TTL_MS = Number(process.env.CACHE_TTL_MS || 3 * 60 * 60 * 1000);
const CACHE_DIR = path.join(ROOT, ".cache", "http");
const ALLOWED_HOSTS = new Set([
  "api.weather.gov",
  "api.tidesandcurrents.noaa.gov",
  "marine-api.open-meteo.com",
  "wildlife.ca.gov",
  "www.cdph.ca.gov",
  "www.lawsonslanding.com"
]);

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml; charset=utf-8"
};

function send(res, status, headers, body) {
  res.writeHead(status, headers);
  res.end(body);
}

function cachePathFor(url) {
  const hash = crypto.createHash("sha256").update(url).digest("hex");
  return path.join(CACHE_DIR, `${hash}.json`);
}

async function readCache(url) {
  try {
    const raw = await fs.readFile(cachePathFor(url), "utf8");
    const cached = JSON.parse(raw);
    const age = Date.now() - new Date(cached.savedAt).getTime();
    if (!Number.isFinite(age) || age > CACHE_TTL_MS) return null;
    return cached;
  } catch {
    return null;
  }
}

async function writeCache(url, payload) {
  await fs.mkdir(CACHE_DIR, { recursive: true });
  await fs.writeFile(cachePathFor(url), JSON.stringify({
    ...payload,
    savedAt: new Date().toISOString()
  }));
}

function assertAllowedTarget(target) {
  const parsed = new URL(target);
  if (parsed.protocol !== "https:") throw new Error("Only https upstream URLs are allowed");
  if (!ALLOWED_HOSTS.has(parsed.hostname)) throw new Error(`Host is not allowlisted: ${parsed.hostname}`);
}

async function handleCachedFetch(req, res, requestUrl) {
  const target = requestUrl.searchParams.get("url");
  if (!target) {
    send(res, 400, { "content-type": "text/plain; charset=utf-8" }, "Missing url");
    return;
  }

  try {
    assertAllowedTarget(target);
    const cached = await readCache(target);
    if (cached) {
      send(res, cached.status, {
        "content-type": cached.contentType || "text/plain; charset=utf-8",
        "x-launch-cache": "HIT",
        "x-launch-cache-saved-at": cached.savedAt,
        "cache-control": "private, max-age=60"
      }, Buffer.from(cached.body, "base64"));
      return;
    }

    const upstream = await fetch(target, {
      headers: {
        "accept": req.headers.accept || "*/*",
        "user-agent": "LaunchWindowPOC/1.0"
      }
    });
    const body = Buffer.from(await upstream.arrayBuffer());
    const payload = {
      status: upstream.status,
      contentType: upstream.headers.get("content-type") || "text/plain; charset=utf-8",
      body: body.toString("base64")
    };

    if (upstream.ok) await writeCache(target, payload);

    send(res, upstream.status, {
      "content-type": payload.contentType,
      "x-launch-cache": upstream.ok ? "MISS" : "BYPASS",
      "cache-control": "private, max-age=60"
    }, body);
  } catch (error) {
    send(res, 502, { "content-type": "text/plain; charset=utf-8" }, error.message);
  }
}

async function handleStatic(req, res, requestUrl) {
  const pathname = requestUrl.pathname === "/" ? "/index.html" : requestUrl.pathname;
  const filePath = path.normalize(path.join(ROOT, pathname));
  if (!filePath.startsWith(ROOT)) {
    send(res, 403, { "content-type": "text/plain; charset=utf-8" }, "Forbidden");
    return;
  }

  try {
    const body = await fs.readFile(filePath);
    send(res, 200, {
      "content-type": MIME_TYPES[path.extname(filePath)] || "application/octet-stream",
      "cache-control": "no-store"
    }, body);
  } catch {
    send(res, 404, { "content-type": "text/plain; charset=utf-8" }, "Not found");
  }
}

const server = http.createServer((req, res) => {
  const requestUrl = new URL(req.url, `http://${req.headers.host || `localhost:${PORT}`}`);
  if (requestUrl.pathname === "/api/fetch") {
    handleCachedFetch(req, res, requestUrl);
    return;
  }
  handleStatic(req, res, requestUrl);
});

server.listen(PORT, () => {
  console.log(`Launch Window server running at http://localhost:${PORT}`);
  console.log(`Upstream cache TTL: ${Math.round(CACHE_TTL_MS / 60000)} minutes`);
});
