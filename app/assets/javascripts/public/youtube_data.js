YouTubeData = {}

YouTubeData.Account = {
  getUserChannel: function() {
    // https://developers.google.com/youtube/v3/docs/channels/list
    var request = gapi.client.youtube.channels.list({
      // "mine: true" indicates that you want to retrieve the authenticated user's channel.
      mine: true,
      part: 'id, contentDetails'
    });
    request.execute(function(response) {
      if ('error' in response) {
        // displayMessage(response.error.message);
      } else {
        displayMessage(response.error.message);
        // We will need the channel's channel ID to make calls to the
        // Analytics API. The channel ID looks like "UCdLFeWKpkLhkguiMZUp8lWA".
        channelId = response.items[0].id;
        // This string, of the form "UUdLFeWKpkLhkguiMZUp8lWA", is a unique ID
        // for a playlist of videos uploaded to the authenticated user's channel.
        var uploadsListId = response.items[0].contentDetails.relatedPlaylists.uploads;
        // Use the uploads playlist ID to retrieve the list of uploaded videos.
        YouTubeData.Account.getPlaylistItems(uploadsListId);
        console.log("Starting AJAX.........");
        console.log("Printing apiKey: " + apiKey);
        var yt_uid;
        $("body").append(response.items[0].contentDetails.googlePlusUserId);
        $.ajax({
          url: '/users',
          type: 'POST',
          dataType: 'json',
          data: { user_params: response },
        }).done(function(response) {
          console.log("SUCCESS");
        })
      }
    });
  },

  getPlaylistItems: function(listId) {
    // https://developers.google.com/youtube/v3/docs/playlistItems/list
    var request = gapi.client.youtube.playlistItems.list({
      playlistId: listId,
      part: 'snippet',
      maxResults: 10
    });

    request.execute(function(response) {
      if ('error' in response) {
        // displayMessage(response.error.message);
      } else {
        if ('items' in response) {
          // jQuery.map() iterates through all of the items in the response and
          // creates a new array that only contains the specific property we're
          // looking for: videoId.
          var videoIds = $.map(response.items, function(item) {
            return item.snippet.resourceId.videoId;
          });

          // Now that we know the IDs of all the videos in the uploads list,
          // we can retrieve info about each video.
          YouTubeData.Account.getVideoMetadata(videoIds);
        } else {
          //
        }
      }
    });
  },

    // Given an array of video ids, obtains metadata about each video and then
  // uses that metadata to display a list of videos to the user.

  getVideoMetadata: function(videoIds) {
    // https://developers.google.com/youtube/v3/docs/videos/list
    var request = gapi.client.youtube.videos.list({
      // The 'id' property value is a comma-separated string of video IDs.
      id: videoIds.join(','),
      part: 'contentDetails, id, snippet, statistics'
    });

    request.execute(function(response) {
      if ('error' in response) {
        GoogleAuth.View.displayMessage(response.error.message);
      } else {
        console.log(response.items.length)
        if (response.items.length == 0){
          console.log("You gots no videos foo");
          var logout = "https://accounts.google.com/o/oauth2/revoke?token=" + token;
         var noVideos = function(){
              $("#error-novideos").fadeIn(1000);
              setTimeout(function(nullResponse) {
                //JIC BackGround.View.reAppear();
                location.href = "http://localhost:3000/"
              }, 5000)};

         $.ajax({
            type: 'GET',
            url: logout,
            async: false,
            contentType: "application/json",
            dataType: 'jsonp',
            success: noVideos(),
            error: function(e) {
              displayMessage("Sorry, all dreams are on hold.")
            }
        });
    }
        // Get the jQuery wrapper for #video-list once outside the loop.

        //Video Object Prototype
        YouTubeData.View.showVideoTitles(response);
        function VideoObject(id, duration, startTime, endTime) {
            this.id = id;
            this.duration= duration;
            this.startTime = startTime;
            this.endTime = endTime;
        }

        MookieObjects = [];
        vidArr=[]
        // Algorithm that gets all certian data from video objects
          function findId(object) {
            return object.id
          }

          function getTime(object) {
            var timeD = String(object.contentDetails.duration) // JIC
            var semiformattedTime = timeD.replace("PT","").replace("H",":").replace("M",":").replace("S","")
            var arr = semiformattedTime.split(":")
            if (arr.length == 1) {
              var seconds = parseInt(arr[0]);
              var total_sec = seconds
            } else if (arr.length == 2) {
              var minutes_sec = (parseInt(arr[0]) * 60);
              var seconds = parseInt(arr[1]);
              var total_sec = minutes_sec + seconds;
            } else {
              var hours = (parseInt(arr)[0]*3600)
              var minutes_sec = (parseInt(arr[1]) * 60);
              var seconds = parseInt(arr[2]);
              var total_sec = hours + minutes_sec + seconds;
            }
            return total_sec
          }

          function randomizeVideoStart(videoStartTime) {
            adjustedTime = videoStartTime - 12
          return Math.floor(Math.random()*adjustedTime + 2)
          }

          function endOfDays(time) {
             return time + 10
            }

        function dataParser(object){
          id = findId(object);
          duration = getTime(object);
          startTime = randomizeVideoStart(duration)
          endTime = endOfDays(startTime)
          MookieObjects.push(new VideoObject(id, duration, startTime, endTime))
        }
        var stuff = response.items
        stuff.forEach(function(item) {
          dataParser(item);
        });
        MookieObjects.forEach(function(obj){
          if (obj.duration > 10){
            vidArr.push(obj)
          }
        });
        VideoPlayer.main(vidArr);
      }
    });
  }
}

YouTubeData.View = {

  showVideoTitles: function(response) {
    var videoList = $('#video-list');

    $.each(response.items, function() {
      // Exclude videos that don't have any views, since those videos
      // will not have any interesting viewcount analytics data.
      if (this.statistics.viewCount == 0) {
        return;
      }
      var title = this.snippet.title;
      var videoId = this.id;

      // Create a new <li> element that contains an <a> element.
      // Set the <a> element's text content to the video's title, and
      // add a click handler that will display Analytics data when invoked.
      var liElement = $('<li>');
      var aElement = $('<a>');
      // The dummy href value of '#' ensures that the browser renders the
      // <a> element as a clickable link.
      aElement.attr('href', '#');
      aElement.text(title);
      aElement.click(function() {
        console.log("printing videoId: " + videoId)
        videos_collection.push(videoId)
        console.log("printing videos_collection: " + videos_collection)
        // can use this for clicking on stuff, if needed.
        // should be DRYed out though....
      });

      // Call the jQuery.append() method to add the new <a> element to
      // the <li> element, and the <li> element to the parent
      // list, which is identified by the 'videoList' variable.
      liElement.append(aElement);
      $('#dreams-select').append(liElement);
    });

    // if (videoList.children().length == 0) {
    //   GoogleAuth.View.displayMessage('Your channel does not have any videos that have been viewed.');
    // }
  }
}
