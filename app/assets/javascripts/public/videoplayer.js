var clientId = '974537623396-tvvr2jn442jsf1ifr4qblfhaje5cd0i2.apps.googleusercontent.com';
var apiKey = 'AIzaSyBHlHFpUocBCj-VbXZXy5BKaIkvXh2jpgI';
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
}

VideoPlayer = {
  main: function(videos) {

    VideoMaker = function(userVideos) {
      this.playList = [];
      this.cueList = [];
      this.playList = userVideos.shift()
      this.cueList = this.cueList.concat(userVideos)
    }

    var userList1 = new VideoMaker(videos)

    function onPlayerReady(event) {
      event.target.playVideo();
    }

    var done = false;
    function onPlayerStateChange(event) {
      console.log(event.data)

      // if (event.data == YT.PlayerState.PLAYING && !done) {
      //   setTimeout(stopVideo, 10000);
      //   done = true;
      // }
      if (event.data == YT.PlayerState.PLAYING) {
        setTimeout($('#player').fadeOut(3000), 4000)
      }
    }

    function stopVideo() {
      player.stopVideo();
    }

    function dreamPlaylist(videoarray) {
      videoarray.shift()
      videoTimer(videoarray)
    }

    function playTheVideo(video) {
      player.loadVideoById({
        'videoId': video,
        'startSeconds': 2,
        'endSeconds': 12,
        'suggestedQuality': 'large'});

      dreamPlaylist(userList1.cueList);
    }


    function videoList(videoId) {
      playTheVideo(videoId);
      player.playVideo();
    }



    function videoTimer(array) {
      setTimeout(function() { videoList(array[0])}, 12000)
    }

    player = new YT.Player('player', {
      height: '390',
      width: '640',
      'videoId': userList1.playList,
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange,
      },
    });

    dreamPlaylist(userList1.cueList)
  }
}

