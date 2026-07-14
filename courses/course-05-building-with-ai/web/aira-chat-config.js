// Aira live chat configuration.
// endpoint = the deployed Cloudflare Worker proxy (see ../proxy/AIRA_CHAT_SETUP.md).
// The worker holds the API key as a server-side secret; this file is public and
// must NEVER contain a key. Empty endpoint = graceful fallback to the community page.
window.AIRA_CHAT = {
  endpoint: "https://aira-chat.pkjaslamagrico.workers.dev",
  // Shown once under the chat: honest note for a free public API.
  notice: "Aira runs on a free AI model. Please don't share personal or sensitive information in chat."
};
