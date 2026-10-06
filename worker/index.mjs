import { GET } from "./api.mjs";
import assets from "./assets.mjs";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method not allowed", { status: 405 });
    }
    if (url.pathname === "/api/fetch") {
      // Sites denies the default Cache API. GET owns the bounded in-memory cache.
      return GET(request);
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
