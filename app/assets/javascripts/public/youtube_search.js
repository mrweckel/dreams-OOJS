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
        /* youtube sorgusu */
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
        $.youtubeAPI(ui.item.label);
      }
    });


    $('button#submit').click(function(){
      var value = $('input#youtube').val();
      $.youtubeAPI(value);
    });


    $.youtubeAPI = function(query){
      var results = $('#results');
      results.html('Searching...');
      $.ajax({
        type: 'GET',
        url: 'http://gdata.youtube.com/feeds/api/videos?q=' + query + '&max-results=20&v=2&alt=jsonc',
        dataType: 'jsonp',
        success: function( response ){

          // console.log(response.data.items);
          YouTubeSearch.SearchBar.compileVideoObjects(response.data.items);

          if( response.data.items ){
            results.empty();
            $.each( response.data.items, function(i, data) {
              results.append('<div class="youtube">\
                <img src="' + data.thumbnail.sqDefault + '" alt="" />\
                <h3><a href="javascript:void(0)" onclick="$.youtubePlay(\'' + data.id + '\', \'' + data.content[5] + '\')">' + data.title + '</a></h3>\
                <p>' + data.description + '</p>\
                </div>\
                <div class="youtubeplay" id="' + data.id + '"></div>');
            });
          }
          else {
            results.html('<div class="fail"><strong>' + query + '</strong> no videos found!</div>');
          }
        }
      });
    }
    $.youtubePlay = function(yid, frame){
      $('.youtubeplay').slideUp().empty();
      $('#'+yid).slideDown().html('<iframe src="'+ frame +'&autoplay=1" style="width: 100%; box-sizing: border-box; height: 300px" />');
    }
  },

  parseVideoObject: function(video_object) {
    return {
      video_id: video_object.id,
      duration: video_object.duration
    }
  },

  compileVideoObjects: function(video_objects) {
    for(var i = 0; i < video_objects.length; i++) {
      results_values[i] = (YouTubeSearch.SearchBar.parseVideoObject(video_objects[i]));
    }
  }
}

$(document).ready(function() {
    YouTubeSearch.SearchBar.main();
})
