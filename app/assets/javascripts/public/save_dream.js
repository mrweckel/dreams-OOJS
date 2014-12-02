SaveDream = {
  save: function(video_data) {
    $.ajax({
      url: '/dreams',
      type: 'POST',
      dataType: 'JSON',
      data: { dream: video_data },
      success: console.log("SUCCESS!")
    })
    .done(function() {
      console.log("success");
    })
  }
}
