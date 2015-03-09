Dreams.YouTubeSearch = function(apiKey, background){
  this.apiKey = apiKey;
  this.background = background;
}

Dreams.YouTubeSearch.prototype = {
  results_values: [],

  main: function() {
    var that = this;
    var apiKey = this.apiKey.responseText;
    $('#youtube').autocomplete({
      source: function(request, response){
        /* Google Developer ID (optional) */
        /* Search keyword */
        var query = request.term;
        /* youtube query */
        $.ajax({
          url: "https://suggestqueries.google.com/complete/search?hl=en&ds=yt&client=youtube&hjson=t&cp=1&q="+query+"&key="+ apiKey +"&format=5&alt=json&callback=?",
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
        selected_search = true;
        $.youtubeAPI(ui.item.label, 10); // Change integer to change number of search results
      },
      open: function () {
        $('ul.ui-autocomplete').addClass('opened');
      },
      close: function () {
        $('ul.ui-autocomplete').removeClass('opened').css('display', 'block');
      }
    }).data("ui-autocomplete")._renderItem = function(ul, item) {
      var $a = $("<a></a>");
      $("<span class='result'></span>").text(item.label).appendTo($a);
      return $("<li></li>").append($a).appendTo(ul);
    };

    $('input#youtube').keyup(function(event){
      event.preventDefault();
      if(event.keyCode == 13 && selected_search == false){
        var value = $('input#youtube').val();
        $.youtubeAPI(value, 10); // Change integer to change number of search results
      }
    });


    $('button#submit').click(function(){
      var value = $('input#youtube').val();
      $.youtubeAPI(value, 10); // Change integer to change number of search results
    });


    $.youtubeAPI = function(query, max_results){
      console.log(query);
      $.ajax({
        type: 'GET',
        url: 'https://gdata.youtube.com/feeds/api/videos?q=' + query + '&max-results=' + max_results + '&v=2&alt=jsonc',
        dataType: 'jsonp',
        error: function(){
          console.log("You found me!")
        },
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
          // debugger;
          that.compileVideoObjects(video_objects);
          console.log(that.results_values);
          background.blackOut();
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
      this.results_values[i] = (this.parseVideoObject(video_objects[i]));
    }
  },

  sampleVideoObjects: function(video_objects) {
    return _(video_objects).sample(10);
  }
}


