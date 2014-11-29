describe('Youtube_Data', function() {

	beforeEach(function() {
		youtube = YouTubeData;
		youtube_account = youtube.Account
	});

  it("should be true", function() {
    expect(1 + 1).toBe(2);
  });

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

});