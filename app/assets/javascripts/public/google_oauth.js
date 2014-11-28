var GoogleAuth = {}

  GoogleAuth.Keys = {
    client_id: '340894032158-a7ro9gvu0cm86sotbepj9pei5sgi1nk9.apps.googleusercontent.com',
    scopes: ['https://www.googleapis.com/auth/youtube','https://www.googleapis.com/auth/yt-analytics.readonly']
  }

  GoogleAuth.View = {}


  GoogleAuth.Controller = {
    receiveMessage: function(event){
      if (event.origin !== "https://accounts.google.com") return;
    },

    checkAuth: function() {
      gapi.auth.authorize({
        client_id: GoogleAuth.Keys.client_id,
        scope: GoogleAuth.Keys.scopes,
        immediate: false },
        GoogleAuth.Controller.handleAuthResult;
      },


  // Handle the result of a gapi.auth.authorize() call.
    handleAuthResult: function(authResult) {
      if (authResult) {
        // Auth was successful. Hide auth prompts and show things
        // that should be visible after auth succeeds.
        GoogleAuth.View.authSuccess();
        console.log(authResult);

        GoogleAuth.Controller.loadAPIClientInterfaces();

        var token = authResult.access_token;
        console.log(token)

      $.ajax({
        type:"POST",
        url: "https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=" + token,
        dataType:'JSON'
      }).done(function(data){
        // Use to send data to
      });



    } else {
      // Auth was unsuccessful. Show things related to prompting for auth
      // and hide the things that should be visible after auth succeeds.
      GoogleAuth.View.authFail();

      // Make the #login-link clickable. Attempt a non-immediate OAuth 2 client
      // flow. The current function will be called when that flow completes.
      $('#login-link').click(function() {
        gapi.auth.authorize({
          client_id: GoogleAuth.Keys.client_id,
          scope: GoogleAuth.Keys.scopes,
          immediate: false
          }, GoogleAuth.Controller.handleAuthResult);
        });
      }
    },

    getUserChannel: function() {
    // https://developers.google.com/youtube/v3/docs/channels/list
    var request = gapi.client.youtube.channels.list({
      // "mine: true" indicates that you want to retrieve the authenticated user's channel.
      mine: true,
      part: 'id,contentDetails'
    });
    request.execute(function(response) {
      if ('error' in response) {
        displayMessage(response.error.message);
      } else {
        // We will need the channel's channel ID to make calls to the
        // Analytics API. The channel ID looks like "UCdLFeWKpkLhkguiMZUp8lWA".
        channelId = response.items[0].id;
        // This string, of the form "UUdLFeWKpkLhkguiMZUp8lWA", is a unique ID
        // for a playlist of videos uploaded to the authenticated user's channel.
        var uploadsListId = response.items[0].contentDetails.relatedPlaylists.uploads;
        // Use the uploads playlist ID to retrieve the list of uploaded videos.
        GoogleAuth.Controller.getPlaylistItems(uploadsListId);
      }
    });
   },

   getPlaylistItems: function(listId) {
    // https://developers.google.com/youtube/v3/docs/playlistItems/list
    var request = gapi.client.youtube.playlistItems.list({
      playlistId: listId,
      part: 'snippet'
    });

    request.execute(function(response) {
      if ('error' in response) {
        displayMessage(response.error.message);
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
          GoogleAuth.Controller.getVideoMetadata(videoIds);
        } else {
          displayMessage('There are no videos in your channel.');
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
      part: 'id,snippet,statistics'
    });

    request.execute(function(response) {
      if ('error' in response) {
        GoogleAuth.Controller.displayMessage(response.error.message);
      } else {
        // Get the jQuery wrapper for #video-list once outside the loop.
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
            console.log(videoId)
            //  this is the part that needs to put in the array for
          });

          // Call the jQuery.append() method to add the new <a> element to
          // the <li> element, and the <li> element to the parent
          // list, which is identified by the 'videoList' variable.
          liElement.append(aElement);
          videoList.append(liElement);
        });

        if (videoList.children().length == 0) {
          GoogleAuth.Controller.displayMessage('Your channel does not have any videos that have been viewed.');
        }
      }
    });
  }

  }

  // Helper method to display a message on the page.
  GoogleAuth.View = {
    authSuccess: function(){
      $('.pre-auth').hide();
      $('.post-auth').show();
    },

    authFail: function(){
      $('.post-auth').hide();
      $('.pre-auth').show();
    },

    displayMessage: function(message) {
      $('#message').text(message).show();
    },

  // Helper method to hide a previously displayed message on the page.
    hideMessage: function() {
      $('#message').hide();
    }
}

$(document).ready(function(){
      $(".login").on("click","a#google-login", function(event){
          event.preventDefault();
          gapi.auth.init(function() {
            window.setTimeout(GoogleAuth.Controller.checkAuth, 1);
            //
        });
      });
    });
  /* In later steps, add additional functions above this line. */

GoogleAuth.Controller.loadAPIClientInterfaces = function() {
    gapi.client.load('youtube', 'v3', function() {
      gapi.client.load('youtubeAnalytics', 'v1', function() {
        // After both client interfaces load, use the Data API to request
        // information about the authenticated user's channel.
        GoogleAuth.Controller.getUserChannel();
      });
    });
  }









