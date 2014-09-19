Q.Tool.define("Places/location", function (options) {
	var tool = this;
	var state = tool.state;
	if (!Q.Users.loggedInUser) {
		console.warn("Don't render Places/location when user is not logged in");
		return;
	}
	var publisherId = Q.Users.loggedInUser.id;
	var streamName = "Places/user/location";
	
	$(tool.element).addClass('Places_location_obtained');
	tool.$('.Places_location_map_container').hide();
	
	Q.Streams.Stream
	.onMessage(publisherId, streamName, 'Places/location/updated')
	.set(function (s, msg) {
		state.stream = s; // in case it was missing before
		var a = JSON.parse(msg.instructions);
		if (a.miles) {
			tool.$('.Places_location_miles').val(a.miles);
		}
		_showMap(a.latitude, a.longitude, a.miles);
	});
	
	Q.Streams.retainWith(this)
	.get(publisherId, streamName, function (err) {
		if (!err) {
			var stream = state.stream = this;
			var miles = stream.get('miles');
			var latitude = stream.get('latitude');
			var longitude = stream.get('longitude');
			if (miles) {
				tool.$('.Places_location_miles').val(miles);
			}
		}
		if (!latitude || !longitude || !miles) {
			$(tool.element).removeClass('Places_location_obtained')
				.addClass('Places_location_obtaining');
		} else {
			setTimeout(function () {
				_showMap(latitude, longitude, miles);
			}, state.map.delay);
		}
	});
	
	tool.$('.Places_location_miles').on('change', function () {
		_submit();
	});
	
	tool.$('.Places_location_set, .Places_location_update_button')
	.on(Q.Pointer.click, function () {
		// $('#Places_location_foo').show()
// 		.plugin('Q/placeholders')
// 		.plugin('Q/clickfocus');
// 		return;
		var $this = $(this);
		$this.addClass('Places_obtaining');
		navigator.geolocation.getCurrentPosition(
		function (geo) {
			var fields = Q.extend({
				unsubscribe: true,
				subscribe: true,
				miles: $('select[name=miles]').val()
			}, geo.coords);
			Q.req("Places/geolocation", [], 
			function (err, data) {
				Q.Streams.Stream.refresh(
					publisherId, streamName, null,
					{ messages: 1, evenIfNotRetained: true}
				);
				$this.removeClass('Places_obtaining').hide(500);
			}, {method: 'post', fields: fields});
		}, function () {
			tool.$('.Places_location_set').hide();
			tool.$('.Places_location_zipcode')
			.submit(function () { return false; })
			.show(1, function () {
				$('input', this)
				.plugin('Q/placeholders')
				.plugin('Q/clickfocus')
				.on('keydown', function (event) {
					var $this = $(this);
					if (event.keyCode == 13) {
						_submit($this.val());
						return false;
					} else if (event.keyCode == 27) {
						_cancel($this);
					}
				}).on('blur', function () {
					var $this = $(this);
					if ($this.val().length === 5) {
						_submit($this.val());
					} else {
						_cancel($this);
					}
				});
				$this.removeClass('Places_obtaining').hide(500);
			});
		}, {
			maximumAge: 300000
		});
	});
	
	function _submit(zipcode) {
		Q.req('Places/geolocation', ['attributes'], function (err, data) {
			var msg = Q.firstErrorMessage(err, data && data.errors);
			if (msg) {
				return alert(msg);
			}
			tool.$('.Places_location_zipcode').hide();
			Q.Streams.Stream.refresh(
				publisherId, streamName, null,
				{ messages: 1, evenIfNotRetained: true }
			);
		}, {
			method: 'post',
			fields: {
				zipcode: zipcode || undefined,
				miles: tool.$('.Places_location_miles').val()
			}
		});
	}
	
	function _cancel($input) {
		$input.val('');
		tool.$('.Places_location_zipcode').hide();
		tool.$('.Places_location_set').show();
	}
	
	var previous = {};
	function _showMap(latitude, longitude, miles, callback) {

		if (latitude == previous.latitude
		&& longitude == previous.longitude
		&& miles == previous.miles) {
			return;
		}
		previous = {
			latitude: latitude,
			longitude: longitude,
			miles: miles
		};

		Q.Places.loadGoogleMaps(function () {
			_showPlaceName();
			$(tool.element).removeClass('Places_location_obtaining')
				.addClass('Places_location_obtained');
			setTimeout(function () {
				tool.$('.Places_location_map_container')
				.slideDown(300, _showLocationAndCircle);
			}, 0);
		});
		
		function _showPlaceName() {
			// proxy through server, up to 15,000 requests though per 24 hours
			// Q.request("http://maps.googleapis.com/maps/api/geocode/json?latlng=37.42,-122.08&sensor=false&_=1411063858378", function (err, data) {
			// 	debugger;
			// }, {extend: false});
		}

		function _showLocationAndCircle() {
			var element = tool.$('.Places_location_map')[0];
	        var map = new google.maps.Map(element, {
				center: new google.maps.LatLng(latitude, longitude),
				zoom: 11 - Math.floor(Math.log(miles) / Math.log(2)),
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				draggable: false,
				panControl: false,
				disableDoubleClickZoom: true,
				zoomControl: false,
				scaleControl: false,
				disableDefaultUI: true,
				scrollwheel: false,
				navigationControl: false
	        });
			// var latlngbounds = new google.maps.LatLngBounds();
			// latlngbounds.extend(n);
			// map.setCenter(latlngbounds.getCenter());
			// map.fitBounds(latlngbounds);
			
			// Create marker 
			var marker = new google.maps.Marker({
			  map: map,
			  position: new google.maps.LatLng(latitude, longitude),
			  title: 'My location'
			});

			// Add circle overlay and bind to marker
			var circle = new google.maps.Circle({
			  map: map,
			  radius: miles*1609.34,
			  fillColor: '#0000AA'
			});
			circle.bindTo('center', marker, 'position');
			
			callback && callback();
		}
	}
},

{ // default options here
	map: {
		delay: 300
	}
},

{ // methods go here
	
});