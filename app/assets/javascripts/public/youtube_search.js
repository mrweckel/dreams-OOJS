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
            console.log(item);
            return {
              label: item[0],
              value: item[0]
            }
          }));
       }});
      },
      /* You can use transaction is selected here to */
      select: function( event, ui ) {
        $.youtubeAPI(ui.item.label, 10); // Change integer to change number of search results
      },
      open: function () {
        $('ul.ui-autocomplete').addClass('opened');
      },
      close: function () {

        $('ul.ui-autocomplete').removeClass('opened').css('display', 'block').css('z-index','-1');

      }
    }).data("ui-autocomplete")._renderItem = function(ul, item) {
      var $a = $("<a></a>");
      $("<span class='result'></span>").text(item.label).appendTo($a);
      return $("<li></li>").append($a).appendTo(ul);
    };

    $('input#youtube').keyup(function(event){
      event.preventDefault();
      if(event.keyCode == 13){
        var value = $('input#youtube').val();
        $.youtubeAPI(value, 10); // Change integer to change number of search results
      }
    });


    $('button#submit').click(function(){
      var value = $('input#youtube').val();
      $.youtubeAPI(value, 10); // Change integer to change number of search results
    });


    $.youtubeAPI = function(query, max_results){
      $.ajax({
        type: 'GET',
        url: 'http://gdata.youtube.com/feeds/api/videos?q=' + query + '&max-results=' + max_results + '&v=2&alt=jsonc',
        dataType: 'jsonp',
        success: function( response ){

        var video_objects = response.data.items;

        function VideoObject(id, duration, startTime, endTime) {
          this.id = id;
          this.duration= duration;
          this.startTime = startTime;
          this.endTime = endTime;
        }

        BerthaObjects = [];
        searchVidArr=[]
        // Algorithm that gets all certian data from video objects
          function findId(object) {
            return object.id
          }

          function getTime(object) {
            return object.duration
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
            BerthaObjects.push(new VideoObject(id, duration, startTime, endTime))
          }
        video_objects.forEach(function(item) {
          dataParser(item);
         });
        BerthaObjects.forEach(function(obj){
          if (obj.duration > 10){
            searchVidArr.push(obj)
          }
        });
          // UNCOMMENT HERE FOR TRULY RANDOM SAMPLING OF SEARCH RESULTS
          // video_objects = YouTubeSearch.SearchBar.sampleVideoObjects(video_objects);

          YouTubeSearch.SearchBar.compileVideoObjects(video_objects);
          console.log(results_values);
          BackGround.View.blackOut();
          VideoPlayer.main(searchVidArr)
          $("#dream-modal-container").hide();

        }
      });
    }
  },

  parseVideoObject: function(video_object) {
    return video_object.id;
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
    $("input#youtube").focus();

    window.setTimeout(function() {
      YouTubeSearch.SearchBar.main();
    }, 1);

    var event_counter = 0;
    $("body").on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd',".ui-autocomplete",
      function() {
        if(event_counter % 2 != 0) {
           $('ul.ui-autocomplete').css('display', 'none');
         }
        event_counter ++;
     });
  });
});


