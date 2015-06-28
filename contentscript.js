/* Send message to background script in order to disaply action icon */
chrome.runtime.sendMessage({ from: 'content', subject: 'showPageAction' });

/* Handle "ping" sent from popup script */
chrome.runtime.onMessage.addListener(function(msg, sender, response) {
  if ((msg.from === 'popup') && (msg.subject === 'getVideoIds')) {
    var youtubeVideosIds = []
      , getYoutubeVideoId;

    getYoutubeVideoId = function(url) {
      var regex = new RegExp("[\\?&]v=([^&#]*)")
        , results
        , parser;

      parser = document.createElement("a");
      parser.href = url;

      results = regex.exec(parser.search);

      if (results.length) {
        return decodeURIComponent(results[1].replace(/\+/g, " "));
      }
    };

    $('div[id*=jwplayer][id*=-div] param[name=flashvars]').each(function(index, node) {
      var params = node.value.split('&');

      for (var i = 0; i < params.length; i++) {
        var pair = params[i].split('=')
          , paramName  = pair[0]
          , paramValue = pair[1];

        if (paramName == 'file' && paramValue.match(/youtube/)) {
          var url = decodeURIComponent(paramValue.replace(/\+/g,  " "))
            , id = getYoutubeVideoId(url);

          youtubeVideosIds.push(id);
        }
      }
    });

    response(youtubeVideosIds);
  }
});
