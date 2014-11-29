describe('Youtube_Data', function() {
  var youtube;
  var youtube_account;
  beforeEach(function() { youtube = YouTubeData;
    youtube_account = youtube.Account;
   });
  afterEach (function() { youtube_account = undefined; 
    youtube = undefined;
  });
	// beforeEach(function() {
	// 	youtube = YouTubeData;
	// 	youtube_account = youtube.Account
	// });

// Spy allows you to fake a method instead of actually firing/running the method
  it("should spy on getUserChannel method", function() {
  	var spy = spyOn(youtube_account, 'getUserChannel');
  	youtube_account.getUserChannel();
  	expect(spy).toHaveBeenCalled();
  });

  it("should spy on getPlaylistItems method", function() {
  	var spy = spyOn(youtube_account, 'getPlaylistItems');
  	youtube_account.getPlaylistItems();
  	expect(spy).toHaveBeenCalled();
  });

  it("should spy on getVideoMetadata method", function() {
  	var spy = spyOn(youtube_account, 'getVideoMetadata');
  	youtube_account.getVideoMetadata();
  	expect(spy).toHaveBeenCalled();
  });

  // it("should have getUserChannel call request execute method", function() {
  //   var spy = spyOn(youtube_account, 'getUserChannel');
  //   youtube_account.getUserChannel();
  //   expect(spy).toHaveBeenCalled();
  // });

});