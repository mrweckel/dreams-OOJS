describe('Google_Oauth', function() {
  
	beforeEach(function() {
		google = GoogleAuth;
	});

  it("shoud be true", function() {
    expect(1 + 1).toBe(2);
  });

  it("should have a scope of youtube", function() {
  	console.log(google.Keys.scopes);
  	expect(google.Keys.scopes == 'https://www.googleapis.com/auth/youtube').toBe(true);
  });

});