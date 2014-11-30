var LoadBar = {}

  LoadBar.Controller = {
    setProgressBarWidth: function(width) {
      return $('.thin-progress-bar').width(width);
    },

    doProgress: function(done){
      var self = this;
    return setTimeout((function() {}, self.setProgressBarWidth("33%"), setTimeout((function() {
      self.setProgressBarWidth("66%");
      return setTimeout((function() {
        self.setProgressBarWidth("100%");
        return setTimeout((function() {
          return done();
        }), 3000);
      }), 3000);
    }), 1500)), 1500);
    }
  }

$(document).ready(function(){
  $('.loadbar-btn').click(function() {
    return LoadBar.Controller.doProgress(function() {
      return LoadBar.Controller.setProgressBarWidth("0");
    });
  });
});