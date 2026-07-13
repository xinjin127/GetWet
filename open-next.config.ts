import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
  // This app uses its own /api/fetch in-memory cache plus HTTP cache headers.
  // R2 incremental cache is intentionally not required for this experiment.
});
