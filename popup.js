var YOUTUBE_API_KEY = "AIzaSyCB5teqHq4CA5SuJS2E3MOYbTi1RC9YqMM";

var renderVideos = function(youtubeVideoUrls) {

  var videosContainer = document.getElementById("videos");

  youtubeVideoUrls = Array.prototype.slice.call(youtubeVideoUrls);
  youtubeVideoUrls.forEach(function(id, i) {

    $.getJSON("https://www.googleapis.com/youtube/v3/videos?id=" + id + "&part=snippet&key=" + YOUTUBE_API_KEY, function(data) {

      var thumbnail
        , link
        , title
        , grabber
        , grabberLogo
        , container;

      thumbnail = document.createElement('img');
      thumbnail.src = 'http://i3.ytimg.com/vi/' + id + '/mqdefault.jpg';

      title = document.createElement('div');
      title.className = 'title'
      title.textContent = data.items[0].snippet.title.substring(0, 45) + '...';
      title.title = data.items[0].snippet.title;

      link = document.createElement('a');
      link.href = 'https://www.youtube.com/watch?v=' + id;
      link.className = 'youtube-link';
      link.title = 'Δείτε αυτό το video στο Youtube'
      link.target = '_blank';
      link.appendChild(thumbnail);
      link.appendChild(title);

      thumbnail = document.createElement('img');
      thumbnail.src = 'http://i3.ytimg.com/vi/' + id + '/mqdefault.jpg';

      grabberLogo = document.createElement('img');
      grabberLogo.src = 'http://www.videograbby.com/static/images/logo.png';

      grabber = document.createElement('a');
      grabber.href = 'http://www.videograbby.com/#id=' + id;
      grabber.className = 'grabber';
      grabber.title = 'Κατεβαστε αυτό το video στον υπολογιστή σας';
      grabber.target = '_blank';
      grabber.appendChild(grabberLogo);

      container = document.createElement('p');
      container.appendChild(link);
      container.appendChild(grabber);

      videosContainer.appendChild(container);
    });
  });
};

window.addEventListener('DOMContentLoaded', function() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { from: 'popup', subject: 'getVideoIds' }, renderVideos);
  });
});
