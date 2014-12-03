DejaVu = {
  show: function() {
    $.ajax({
      type: 'GET',
      url: 'dreams/show/1',
      dataType: 'JSON',
      success: function(videoParams, textStatus, xhr) {
        console.log(videoParams);
        // We will need to append this to show user's dreams
      }
    });
  }
}
