describe('Google_Oauth', function() {

  var google;
  var google_controller;
  beforeEach(function() { google = GoogleAuth;
    google_controller = google.Controller;
   });
  afterEach (function() { google_controller = undefined; 
    google = undefined;
  });

  it("should have a scope of youtube", function() {
  	expect(google.Keys.scopes).not.toBe(null);
  });

  it("should have a client_id", function() {
  	expect(google.Keys.client_id).not.toBe(null);
  });

// Spy allows you to fake a method instead of actually firing/running the method
  it("should spy on checkAuth method", function() {
  	var spy = spyOn(google_controller, 'checkAuth');
  	google_controller.checkAuth();
  	expect(spy).toHaveBeenCalled();
  });

  it("should spy on handleAuthResult method", function() {
  	var spy = spyOn(google_controller, 'handleAuthResult');
  	google_controller.handleAuthResult();
  	expect(spy).toHaveBeenCalled();
  });

  it("should spy on receiveMessage method", function() {
  	var spy = spyOn(google_controller, 'receiveMessage');
  	google_controller.receiveMessage();
  	expect(spy).toHaveBeenCalled();
  });

});