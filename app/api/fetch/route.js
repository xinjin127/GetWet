const CACHE_TTL_MS = 3 * 60 * 60 * 1000;
const MAX_CACHE_ENTRIES = 250;
const ALLOWED_HOSTS = new Set([
  "api.weather.gov",
  "api.tidesandcurrents.noaa.gov",
  "api.open-meteo.com",
  "marine-api.open-meteo.com",
  "wildlife.ca.gov",
  "www.cdph.ca.gov",
  "services2.arcgis.com",
  "www.lawsonslanding.com"
]);

const cache = globalThis.launchWindowFetchCache || new Map();
globalThis.launchWindowFetchCache = cache;

function cacheKeyFor(url) {
  return url;
}

function pruneCache() {
  while (cache.size > MAX_CACHE_ENTRIES) {
    const oldestKey = cache.keys().next().value;
    cache.delete(oldestKey);
  }
}

function assertAllowedTarget(target) {
  const parsed = new URL(target);
  if (parsed.protocol !== "https:") throw new Error("Only https upstream URLs are allowed");
  if (!ALLOWED_HOSTS.has(parsed.hostname)) throw new Error(`Host is not allowlisted: ${parsed.hostname}`);
}

function responseFromPayload(payload, cacheStatus) {
  return new Response(payload.body, {
    status: payload.status,
    headers: {
      "content-type": payload.contentType,
      "x-launch-cache": cacheStatus,
      "x-launch-cache-saved-at": payload.savedAt,
      "cache-control": "no-store"
    }
  });
}

export async function GET(request) {
  const requestUrl = new URL(request.url);
  const target = requestUrl.searchParams.get("url");
  if (!target) return new Response("Missing url", { status: 400 });

  try {
    assertAllowedTarget(target);
    const key = cacheKeyFor(target);
    const cached = cache.get(key);
    if (cached) {
      const age = Date.now() - new Date(cached.savedAt).getTime();
      if (Number.isFinite(age) && age >= 0 && age <= CACHE_TTL_MS) {
        return responseFromPayload(cached, "HIT");
      }
      cache.delete(key);
    }

    const upstream = await fetch(target, {
      headers: {
        accept: request.headers.get("accept") || "*/*",
        "user-agent": "LaunchWindowPOC/1.0"
      },
      signal: AbortSignal.timeout(15000),
      redirect: "manual",
      cache: "no-store"
    });
    if (upstream.status >= 300 && upstream.status < 400) {
      throw new Error("Upstream redirect rejected; source URL needs updating");
    }
    const body = await upstream.arrayBuffer();
    const payload = {
      status: upstream.status,
      contentType: upstream.headers.get("content-type") || "text/plain; charset=utf-8",
      body,
      savedAt: new Date().toISOString()
    };

    if (upstream.ok) {
      cache.set(key, payload);
      pruneCache();
    }

    return responseFromPayload(payload, upstream.ok ? "MISS" : "BYPASS");
  } catch (error) {
    return new Response(error.message, { status: 502 });
  }
}
