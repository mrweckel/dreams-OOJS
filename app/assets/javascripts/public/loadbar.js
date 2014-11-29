
  var doProgress, setProgressBarWidth;

  setProgressBarWidth = function(width) {
    return $('.thin-progress-bar').width(width);
  };

  doProgress = function(done) {
    return setTimeout((function() {}, setProgressBarWidth("30%"), setTimeout((function() {
      setProgressBarWidth("35%");
      return setTimeout((function() {
        setProgressBarWidth("100%");
        return setTimeout((function() {
          return done();
        }), 3000);
      }), 3000);
    }), 1500)), 1500);
  };

  doProgress(function() {
    return setProgressBarWidth("0");
  });


$(document).ready(function(){
  $('.loadbar-btn').click(function() {
    return doProgress(function() {
      return setProgressBarWidth("0");
    });
  });
});