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
        displayMessage(response.error.message);
      } else {
        // We will need the channel's channel ID to make calls to the
        // Analytics API. The channel ID looks like "UCdLFeWKpkLhkguiMZUp8lWA".
        channelId = response.items[0].id;
        // This string, of the form "UUdLFeWKpkLhkguiMZUp8lWA", is a unique ID
        // for a playlist of videos uploaded to the authenticated user's channel.
        var uploadsListId = response.items[0].contentDetails.relatedPlaylists.uploads;
        // Use the uploads playlist ID to retrieve the list of uploaded videos.
        YouTubeData.Account.getPlaylistItems(uploadsListId);
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
          YouTubeData.Account.getVideoMetadata(videoIds);
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
      part: 'id, snippet, statistics'
    });

    request.execute(function(response) {
      if ('error' in response) {
        GoogleAuth.View.displayMessage(response.error.message);
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
          GoogleAuth.View.displayMessage('Your channel does not have any videos that have been viewed.');
        }
      }
    });
  }
}