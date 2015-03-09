Dreams.YTDataView = function(){

}

Dreams.YTDataView.prototype = {
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
