// Enter a client ID for a web application from the Google Developer Console.
// The provided clientId will only work if the sample is run directly from
// https://google-api-javascript-client.googlecode.com/hg/samples/authSample.html
// In your Developer Console project, add a JavaScript origin that corresponds to the domain
// where you will be running the script.
var clientId = '974537623396-tvvr2jn442jsf1ifr4qblfhaje5cd0i2.apps.googleusercontent.com';

// Enter the API key from the Google Develoepr Console - to handle any unauthenticated
// requests in the code.
// The provided key works for this sample only when run from
// https://google-api-javascript-client.googlecode.com/hg/samples/authSample.html
// To use in your own application, replace this API key with your own.
var apiKey = 'AIzaSyBHlHFpUocBCj-VbXZXy5BKaIkvXh2jpgI';

// // To enter one or more authentication scopes, refer to the documentation for the API.
// var scopes = 'https://www.googleapis.com/auth/plus.me';

// Use a button to handle authentication the first time.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {

  // VideoPlayer.main();

}

VideoPlayer = {
  main: function(videos) {
    // var myVideo = ["l-gQLqv9f4o", "OPdbdjctx2I", "6IwmqLAp1Fk", "veFZPU8G8EU", "BPJ0729NVjw", "2v2IBLDJij8", "ORhEE9VVg"]

    var myVideo = [];
    for(var i = 0; i < videos.length; i++) {
      myVideo[i] = videos[i].id;
    }

    console.log(myVideo);

    VideoMaker = function(userVideos) {
      this.playList = [];
      this.cueList = [];
      this.playList = userVideos.shift()
      this.cueList = this.cueList.concat(userVideos)
    }



    var userList = new VideoMaker(myVideo)
    // 3. This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.

    // 4. The API will call this function when the video player is ready.
    function onPlayerReady(event) {
      event.target.playVideo();
    }

    // 5. The API calls this function when the player's state changes.
    //    The function indicates that when playing a video (state=1),
    //    the player should play for six seconds and then stop.
    var done = false;
    function onPlayerStateChange(event) {
      console.log(event.data)

      if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 6000);
        done = true;
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
        'startSeconds': 40,
        'endSeconds': 50,
        'suggestedQuality': 'large'});

      dreamPlaylist(userList.cueList);
    }


    function videoList(videoId) {
      playTheVideo(videoId);
      player.playVideo();
    }



    function videoTimer(array) {
      setTimeout(function() { videoList(array[0])}, 10000)
    }

    player = new YT.Player('player', {
      height: '390',
      width: '640',
      'videoId': userList.playList,
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange,
      },
    });

    dreamPlaylist(userList.cueList)
  }
}

VideoPlayer2 = {
  main: function(videos) {
    // var myVideo = ["l-gQLqv9f4o", "OPdbdjctx2I", "6IwmqLAp1Fk", "veFZPU8G8EU", "BPJ0729NVjw", "2v2IBLDJij8", "ORhEE9VVg"]

    var myVideo = [];
    for(var i = 0; i < videos.length; i++) {
      myVideo[i] = videos[i].id;
    }

    console.log(myVideo);

    VideoMaker = function(userVideos) {
      this.playList = [];
      this.cueList = [];
      this.playList = userVideos.shift()
      this.cueList = this.cueList.concat(userVideos)
    }



    var userList2 = new VideoMaker(myVideo)
    // 3. This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.

    // 4. The API will call this function when the video player is ready.
    function onPlayerReady(event) {
      event.target.playVideo();
    }

    // 5. The API calls this function when the player's state changes.
    //    The function indicates that when playing a video (state=1),
    //    the player should play for six seconds and then stop.
    var done = false;
    function onPlayerStateChange(event) {
      console.log(event.data)

      if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 6000);
        done = true;
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
        'startSeconds': 40,
        'endSeconds': 50,
        'suggestedQuality': 'large'});

      dreamPlaylist(userList2.cueList);
    }


    function videoList(videoId) {
      playTheVideo(videoId);
      player.playVideo();
    }



    function videoTimer(array) {
      setTimeout(function() { videoList(array[0])}, 10000)
    }

    player = new YT.Player('ytplayer', {
      height: '390',
      width: '640',
      'videoId': userList2.playList,
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange,
      },
    });

    dreamPlaylist(userList2.cueList)
  }
}



// <script>
//   // Load the IFrame Player API code asynchronously.
//   var tag = document.createElement('script');
//   tag.src = "https://www.youtube.com/player_api";
//   var firstScriptTag = document.getElementsByTagName('script')[0];
//   firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//   // Replace the 'ytplayer' element with an <iframe> and
//   // YouTube player after the API code downloads.
//   var player;
//   function onYouTubePlayerAPIReady() {
//     player = new YT.Player('ytplayer', {
//       height: '390',
//       width: '640',
//       videoId: 'M7lc1UVf-VE'
//     });
//   }
// </script>
