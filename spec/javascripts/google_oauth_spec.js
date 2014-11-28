describe('Google_Oauth', function() {
  
	beforeEach(function() {
		google = GoogleAuth;
	});

  it("should be true", function() {
    expect(1 + 1).toBe(2);
  });

  it("should have a scope of youtube", function() {
  	expect(google.Keys.scopes).not.toBe(null);
  });

  it("should have a client_id", function() {
  	expect(google.Keys.client_id).not.toBe(null);
  });

  


});