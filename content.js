$(document).ready(function(){
  $("link[rel='icon']").attr("href", chrome.extension.getURL("/images/Spotify_Icon_RGB_White.png"));

  $(window).on("load", function(){
     $.ready.then(function(){
       var backgroundElementSelector = "div.af7ed65aa06ef3900474134b117200be-scss";
       var extendBackground = function (element) {
         // Extend linear gradient further down the page and go diagonal like old style
         const style = getComputedStyle(element);
         var backgroundImage = style.backgroundImage;
         var newBackgroundImage = backgroundImage.replace("40%", "100%");
         element.style.backgroundImage = newBackgroundImage;
       };

       var backgroundElements = $(backgroundElementSelector);
       for (var i = 0; i < backgroundElements.length; i++) {
         extendBackground(backgroundElements[i]);
       }

       var playlistCardPlayButtonSelector = "button._11f5fc88e3dec7bfec55f7f49d581d78-scss";
       var replacePlayButton = function (element) {
         // Replace play buttons on playlists with play button from nav bar
         element.classList.remove("_11f5fc88e3dec7bfec55f7f49d581d78-scss")
         element.classList.add("control-button");
         element.classList.add("spoticon-play-16");
         element.classList.add("control-button--circled");
       };

       var playlistButtonElements = $(playlistCardPlayButtonSelector);
       for (var i = 0; i < playlistButtonElements.length; i++) {
         replacePlayButton(playlistButtonElements[i]);
       }

       var checkElement = function (element) {
         if (element.matches && element.matches(backgroundElementSelector)) {
           extendBackground(element);
         } else if (element.querySelector) {
           var backgroundElement = element.querySelector(backgroundElementSelector);
           if (backgroundElement) {
             extendBackground(backgroundElement);
           }
         }

         if (element.matches && element.matches(playlistCardPlayButtonSelector)) {
           replacePlayButton(element);
         } else if (element.querySelector) {
           var playlistCardPlayButton = element.querySelector(playlistCardPlayButtonSelector);
           if (playlistCardPlayButton) {
             replacePlayButton(playlistCardPlayButton);
           }
         }
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
