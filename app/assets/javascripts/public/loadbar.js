(function() {
  var doProgress, setProgressBarWidth;

  setProgressBarWidth = function(width) {
    return $('.thin-progress-bar').width(width);
  };

  doProgress = function(done) {
    return setTimeout((function() {}, setProgressBarWidth("30%"), setTimeout((function() {
      setProgressBarWidth("60%");
      return setTimeout((function() {
        setProgressBarWidth("100%");
        return setTimeout((function() {
          return done();
        }), 1400);
      }), 1500);
    }), 1300)), 1000);
  };

  doProgress(function() {
    return setProgressBarWidth("0");
  });

  $('.js-do-progress').click(function() {
    return doProgress(function() {
      return setProgressBarWidth("0");
    });
  });

}).call(this);
