import { GET } from "./api.mjs";
import assets from "./assets.mjs";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method not allowed", { status: 405 });
    }
    if (url.pathname === "/api/fetch") {
      const edge = globalThis.caches?.default;
      const key = new Request(url.toString());
      const cached = edge && await edge.match(key);
      if (cached) {
        const response = new Response(cached.body, cached);
        response.headers.set("x-launch-cache", "HIT");
        response.headers.set("cache-control", "no-store");
        return response;
      }
      const response = await GET(request);
      if (edge && response.ok) {
        const savedAt = Date.parse(response.headers.get("x-launch-cache-saved-at"));
        const ttl = Math.floor((savedAt + 10800000 - Date.now()) / 1000);
        if (ttl > 0) {
          const entry = response.clone();
          entry.headers.set("cache-control", `public, max-age=${ttl}`);
          ctx.waitUntil(edge.put(key, entry));
        }
      }
      return response;
    }
    const asset = assets[url.pathname === "/" ? "/index.html" : url.pathname];
    if (!asset) return new Response("Not found", { status: 404 });
    const body = request.method === "HEAD" ? null : Uint8Array.from(atob(asset.body), (character) => character.charCodeAt(0));
    return new Response(body, { headers: {
      "content-type": asset.type,
      "cache-control": url.pathname.startsWith("/assets/") ? "public, max-age=86400" : "no-cache",
      "x-content-type-options": "nosniff"
    } });
  }
};
