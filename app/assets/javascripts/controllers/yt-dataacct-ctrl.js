Dreams.YTDataAcctCtrl = function(view){
  this.view = view;
}

Dreams.YTDataAcctCtrl.prototype = {
  getUserChannel: function() {
    var that = this;
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
        // displayMessage(response.error.message);
        // We will need the channel's channel ID to make calls to the
        // Analytics API. The channel ID looks like "UCdLFeWKpkLhkguiMZUp8lWA".
        channelId = response.items[0].id;
        // This string, of the form "UUdLFeWKpkLhkguiMZUp8lWA", is a unique ID
        // for a playlist of videos uploaded to the authenticated user's channel.
        var uploadsListId = response.items[0].contentDetails.relatedPlaylists.uploads;
        // Use the uploads playlist ID to retrieve the list of uploaded videos.
        that.getPlaylistItems(uploadsListId);
        $.ajax({
          url: '/users',
          type: 'POST',
          dataType: 'json',
          data: { userId: response.items[0].contentDetails.googlePlusUserId }
        }).done(function() {
          console.log("SUCCESS");
        });
      }
    });
  },

  getPlaylistItems: function(listId) {
    var that = this;
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
          that.getVideoMetadata(videoIds);
        } else {
          //
        }
      }
    });
  },

    // Given an array of video ids, obtains metadata about each video and then
  // uses that metadata to display a list of videos to the user.

  getVideoMetadata: function(videoIds) {
    var that = this;
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
        that.view.showVideoTitles(response);

        //VideoObject Class
        function VideoObject(id, duration, startTime, endTime) {
            this.id = id;
            this.duration= duration;
            this.startTime = startTime;
            this.endTime = endTime;
        }

        userVideoObjects = [];
        vidArr=[]
        // Algorithm that gets certian data from video objects
          function findId(object) {
            return object.id
          }

          function getTime(object) {
            var total_sec, hours, minutes_sec, seconds;
            var timeD = String(object.contentDetails.duration) // JIC
            var semiformattedTime = timeD.replace("PT","").replace("H",":").replace("M",":").replace("S","");
            var arr = semiformattedTime.split(":");
            if (arr.length === 1) {
              total_sec = parseInt(arr[0]);
            } else if (arr.length === 2) {
              minutes_sec = (parseInt(arr[0]) * 60);
              seconds = parseInt(arr[1]);
              total_sec = minutes_sec + seconds;
            } else {
              hours = (parseInt(arr)[0]*3600)
              minutes_sec = (parseInt(arr[1]) * 60);
              seconds = parseInt(arr[2]);
              total_sec = hours + minutes_sec + seconds;
            }
            return total_sec
          }

          function randomizeVideoStart(videoStartTime) {
            adjustedTime = videoStartTime - 11
          return Math.floor(Math.random()*adjustedTime + 1)
          }

          function calculatedEndTime(time) {
             return time + 10
          }

        function dataParser(object){
          var id = findId(object);
          var duration = getTime(object);
          var startTime = randomizeVideoStart(duration)
          var endTime = calculatedEndTime(startTime)
          userVideoObjects.push(new VideoObject(id, duration, startTime, endTime))
        }
        var userData = response.items
        userData.forEach(function(item) {
          dataParser(item);
        });
        userVideoObjects.forEach(function(obj){
          if (obj.duration > 10){
            vidArr.push(obj)
          }
        });
        var dream = new Dreams.SaveCtrl;
        dream.save(vidArr);
        VideoPlayer.main(vidArr);
      }
    });
  }
}