var playlistCardPlayButtonSelector = "button._11f5fc88e3dec7bfec55f7f49d581d78-scss";

$(document).ready(function(){
  $("link[rel='icon']").attr("href", chrome.extension.getURL("/images/Spotify_Icon_RGB_White.png"));

  $(window).on("load", function(){
     $.ready.then(function(){
       var playlistButtonElements = $(playlistCardPlayButtonSelector);
       for (var i = 0; i < playlistButtonElements.length; i++) {
         setupPlayButton(playlistButtonElements[i]);
       }

       // Set up observer
       var observer = new MutationObserver(function (records) {
         records.forEach(function (record) {
           record.addedNodes.forEach(function (e) {
             checkElement(e);
           });
         });
       });

       observer.observe(document.body, { childList: true, subtree: true });
     });
  });
});

var setupPlayButton = function (element) {
  // Replace play buttons on playlists with play button from nav bar
  element.classList.remove("_11f5fc88e3dec7bfec55f7f49d581d78-scss")
  element.classList.add("control-button");
  element.classList.add("spoticon-play-16");
  element.classList.add("control-button--circled");

  // Add click handler for togglePlayPauseButton
  element.addEventListener("click", function() {
    if (this.classList.contains("spoticon-play-16")) {
      this.classList.remove("spoticon-play-16");
      this.classList.add("spoticon-pause-16");
    } else if (this.classList.contains("spoticon-pause-16")) {
      this.classList.remove("spoticon-pause-16");
      this.classList.add("spoticon-play-16");
    }
  }, false);
};

var checkElement = function (element) {
  if (element.matches && element.matches(playlistCardPlayButtonSelector)) {
    setupPlayButton(element);
  } else if (element.querySelector) {
    var playlistCardPlayButton = element.querySelector(playlistCardPlayButtonSelector);
    if (playlistCardPlayButton) {
      setupPlayButton(playlistCardPlayButton);
    }
  }
}
