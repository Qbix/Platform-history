Q.Streams.define("MyApp/cool", function () { // stream constructor
	this.onMove = new Q.Event(); // an event that the stream might trigger
}, {
	someMethod: function () {
		// a method of the stream
	}
});

// this is how you set an event handler to be triggered whenever
// any "MyApp/move" message is posted to any "MyApp/cool" stream
Q.Streams.onMessage("MyApp/cool", "MyApp/move").set(function (err, message) {
	// trigger our event
	this.onMove.handle(JSON.parse(message.instructions));
}, "MyApp");