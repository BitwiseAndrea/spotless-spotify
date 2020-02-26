$(document).ready(function(){
  $("link[rel='icon']").attr("href", chrome.extension.getURL("/images/Spotify_Icon_RGB_White.png"));

  // Custom cursor
  var styleTag = $("<style>");
  styleTag.html("._26d9e31a05dd5fba3afe1b281ae2cf9e-scss ._66febc2caff37c822a831232b6e73171-scss:disabled { cursor: url('" + chrome.extension.getURL("/images/not_allowed_small.cur") + "') 0 0, not-allowed; }");
  $("head").append(styleTag);
});
