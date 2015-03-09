Dreams.GoogleAuthKeys = function(){

}

Dreams.GoogleAuthKeys.prototype = {
  client_id:
    $.ajax({
      url: '/client',
      type: 'GET',
      dataType: 'JSON'})
  ,

  apiKey:
    $.ajax({
      url: '/api',
      type: 'GET',
      dataType: 'JSON'})
  ,

  scopes: ['https://www.googleapis.com/auth/youtube','https://www.googleapis.com/auth/yt-analytics.readonly']
}
