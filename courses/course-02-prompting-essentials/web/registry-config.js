// Learner registry (optional). When endpoint is set, each issued certificate quietly
// registers {name, org, email, certId, date, score} to YOUR private Google Sheet so
// learners can recover certificates and you can see how many students you have.
// Setup: ../REGISTRY_SETUP.md (10 minutes, free). Leave empty to disable; nothing breaks.
// The Apps Script /exec URL is safe to expose; it is NOT an API key.
window.CAMBIUM_REGISTRY = {
  endpoint: "https://script.google.c