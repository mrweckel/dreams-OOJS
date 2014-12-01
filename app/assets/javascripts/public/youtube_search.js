var apiKey = 'AI39si7ZLU83bKtKd4MrdzqcjTVI3DK9FvwJR6a4kB_SW_Dbuskit-mEYqskkSsFLxN5DiG1OBzdHzYfW0zXWjxirQKyxJfdkg';

var results_values = [];

YouTubeSearch = {}

YouTubeSearch.SearchBar = {
  main: function() {
    $('#youtube').autocomplete({
      source: function(request, response){
        /* Google Developer ID (optional) */
        /* Search keyword */
        var query = request.term;
        /* youtube query */
        $.ajax({
          url: "http://suggestqueries.google.com/complete/search?hl=en&ds=yt&client=youtube&hjson=t&cp=1&q="+query+"&key="+apiKey+"&format=5&alt=json&callback=?",
          dataType: 'jsonp',
          success: function(data) {
           response( $.map( data[1], function(item) {
            return {
              label: item[0],
              value: item[0]
            }
          }));
         }
       });
      },
      /* You can use transaction is selected here to */
      select: function( event, ui ) {
        $.youtubeAPI(ui.item.label, 20); // Change integer to change number of search results
      }
    });


    $('button#submit').click(function(){
      var value = $('input#youtube').val();
      $.youtubeAPI(value, 20); // Change integer to change number of search results
    });


    $.youtubeAPI = function(query, max_results){
      $.ajax({
        type: 'GET',
        url: 'http://gdata.youtube.com/feeds/api/videos?q=' + query + '&max-results=' + max_results + '&v=2&alt=jsonc',
        dataType: 'jsonp',
        success: function( response ){

          var video_objects = response.data.items;

          // UNCOMMENT HERE FOR TRULY RANDOM SAMPLING OF SEARCH RESULTS
          // video_objects = YouTubeSearch.SearchBar.sampleVideoObjects(video_objects);

          YouTubeSearch.SearchBar.compileVideoObjects(video_objects);

          console.log(results_values);

          BackGround.View.blackOut();

          setTimeout(function() {VideoPlayer.main(results_values)}, 13500);
          LoadBar.Controller.go();
          $("#dream-modal-container").hide();

        }
      });
    }
  },

  parseVideoObject: function(video_object) {
    return video_object.id;
    // return {
    //   video_id: video_object.id,
    //   duration: video_object.duration
    // }
  },

  compileVideoObjects: function(video_objects) {
    for(var i = 0; i < video_objects.length; i++) {
      results_values[i] = (YouTubeSearch.SearchBar.parseVideoObject(video_objects[i]));
    }
  },

  sampleVideoObjects: function(video_objects) {
    return _(video_objects).sample(10);
  }
}



$(document).ready(function() {
  $(".random-dream").on("click","a", function(event){
    event.preventDefault();
    $("#dream-modal").hide();
    $("#dream-modal-container").fadeIn(1000);
    window.setTimeout(function() {
      YouTubeSearch.SearchBar.main();
    }, 1);
  });
})
