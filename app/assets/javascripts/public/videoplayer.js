var clientId = '974537623396-tvvr2jn442jsf1ifr4qblfhaje5cd0i2.apps.googleusercontent.com';
var apiKey = 'AIzaSyBHlHFpUocBCj-VbXZXy5BKaIkvXh2jpgI';
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

    var userList1 = new VideoMaker(videos)

    function onPlayerReady(event) {
      event.target.setVolume(0);
      event.target.playVideo();
    }

    var done = false;
    function onPlayerStateChange(event) {
      console.log('onPlayerStateChange', event)
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
      console.log("wtf");
      // BackGround.View.dreamHasEnded();
      }
  }

    // function onPlayerError(event) {
    //   console.log(event);
    
    // }  

    function stopVideo() {
      player.stopVideo();
    }

    function dreamPlaylist(videoarray) {
      console.log("printing videoarray.length after shift: ");
      console.log(videoarray.length);
      videoTimer(videoarray)
    }

    function playTheVideo(object) {
      player.loadVideoById({
        'videoId': object.id,
        'startSeconds': object.startTime,
        'endSeconds': object.endTime,
        'suggestedQuality': 'large'});

      dreamPlaylist(userList1.cueList);
    }

    function videoList(videoId) {
      playTheVideo(videoId);
      player.playVideo();
    }

    var count = 0
    function videoTimer(array) {
      if(count == 0) {
        setTimeout(function() { videoList(array[0]), array.shift()}, 1000);
        count += 1
      } else if(array.length > 0) {
        setTimeout(function() { videoList(array[0]), array.shift()}, 10000);
      }
    }

    player = new YT.Player('player', {
      height: '576',
      width: '1024',
      'videoId': userList1.playList,
      playerVars: {
        controls: 0,
        disablekb: 1,
        showinfo: 0,
        wmode: "opaque"
      },
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
        // 'onError': onPlayerError
      },
    });

    dreamPlaylist(userList1.cueList)
  }
}





