DejaVu = {
  show: function() {
    $.ajax({
      type: 'GET',
      url: 'dreams/1', // Replace the 1 with :id provided by the id parameter clicked by user
      dataType: 'JSON',
      success: function(videoParams, textStatus, xhr) {
        console.log(videoParams);
        // We will need to append this to show user's dreams
      }
    });
  }
}
