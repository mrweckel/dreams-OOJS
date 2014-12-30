var clientId = GoogleAuth.Keys.client_id.responseText;
var apiKey = GoogleAuth.Keys.client_id.responseText;
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {}

VideoPlayer = {
  main: function(videos) {

    VideoMaker = function(userVideos) {
      this.playList = [];
      this.cueList = [];
      this.playList = userVideos.shift()
      this.cueList = this.cueList.concat(userVideos)
    }

    var userList1 = new VideoMaker(videos);

    function onPlayerReady(event) {
      event.target.setVolume(0);
      event.target.playVideo();
    }

    var done = false;

    function onPlayerStateChange(event) {
      if (event.data == YT.PlayerState.PLAYING) {
        $('#player').fadeIn({
          duration: 2000,
          step: function(now,fx){
            player.setVolume(now*100);
          }
        });
        setTimeout(function() {
          $('#player').fadeOut({
            duration: 2000,
            step: function(now,fx){
              player.setVolume(now*100);
            }
          });
        }, 6000);
      }

      if ((event.data === 0) && (userList1.cueList.length === 0)) {
      BackGround.View.dreamHasEnded();
      }
    }

    function stopVideo() {
      player.stopVideo();
    }

    function dreamPlaylist(videoarray) {
      videoTimer(videoarray)
    }

    function playTheVideo(object) {
      if(player.loadVideoById){
        player.loadVideoById({
          'videoId': object.id,
          'startSeconds': object.startTime,
          'endSeconds': object.endTime,
          'suggestedQuality': 'large'});
      } else {
        player.destroy();
        VideoPlayer.main(searchVidArr);
      }
      dreamPlaylist(userList1.cueList);
    }

    function videoList(videoId) {
      playTheVideo(videoId);
      player.playVideo();
    }

    var count = 0;

    function videoTimer(array) {
      if(count == 0) {
        setTimeout(function() {videoList(array[0]), array.shift()}, 1000);
        count += 1
      } else if (array.length > 0) {
        setTimeout(function() {videoList(array[0]), array.shift()}, 10000);
      }
    }

    player = new YT.Player('player', {
      height: '576',
      width: '1024',
      videoId: userList1.playList,
      playerVars: {
        'controls': 0,
        'disablekb': 1,
        'showinfo': 0,
        'wmode': "opaque"
      },
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      },
    });

    dreamPlaylist(userList1.cueList)
  }
}





