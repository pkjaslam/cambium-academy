// Aira live chat configuration.
// endpoint = the deployed Cloudflare Worker proxy (see ../proxy/AIRA_CHAT_SETUP.md).
// The worker holds the API key as a server-side secret; this file is public and
// must NEVER contain a key. Empty endpoint = graceful fallback to the community page.
window.AIRA_CHAT = {
  endpoint: "https://aira-c