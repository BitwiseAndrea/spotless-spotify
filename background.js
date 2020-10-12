// Fetch 2x the number of items for the homepage
chrome.webRequest.onBeforeRequest.addListener(function (details) {
  let url = new URL(details.url);
  
  if (url.searchParams.has("content_limit")) {
    url.searchParams.set("content_limit", 20);
    return {
      redirectUrl: url.toString()
    };
  }
}, { urls: ["*://api.spotify.com/v1/views/*"] }, ["blocking"]);