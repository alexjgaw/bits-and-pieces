// This function creates an object which we can use to create and keep track of certain events related to asynchronous processes.

// To use:
//  1. Obviously, import or require or otherwise include this file.
//  2. Declare your event tracker with an array of event names, the
//     callback to invoke when everything is finished, and timeout in ms.
//  3. Make sure that your async processes take tracker as a parameter and
//     call tracker.dispatch() when they complete, passing their own name
//     as a string to tracker.dispatch().
//  4. When you call the constructors or whatever, pass your eventTracker
//     object as a parameter.


var eventTracker = function( eventNames, callback, timeout) {
  eventNames = eventNames ? eventNames.sort() : [];
  callback = callback || function() {};
  timeout = timeout || 3000;

  var trackerObj = {};
  var hasTimedout = false;

  var timeoutId = window.setTimeout(function() {
    hasTimedout = true;
    timedoutProcesses = Object.keys(trackerObj).join(' ');
    alert('The following processes timed out: ' + timedoutProcesses);
  }, timeout);

  eventNames.forEach(function(event) {
    trackerObj[event] = document.createEvent('Event');
    trackerObj[event].initEvent('tracker:' + event, true, true);
    document.addEventListener('tracker:' + event, function(event) {
      var propName = event.type.slice(8);

      if (trackerObj.hasOwnProperty(propName)) {
        delete trackerObj[propName];
      }

      var trackerKeys = Object.keys(trackerObj);
      if (trackerKeys.length === 0 && !hasTimedout) {
        window.clearTimeout(timeoutId);
        callback();
      }
    });
  });

  return {
    dispatch: function(event) {
      document.dispatchEvent(trackerObj[event]);
    }
  };
};

/* Sample implementation in ajax call

function SomeCheckoutThing(options, tracker) {
  //buncha stuff

	SomeCheckoutThing.prototype.loadFromRemoteEndpoint = function (endpoint) {
		$.ajax({
			contentType: "application/json; charset=utf-8",
			type: 'GET',
			url: endpoint,
		}).done(function (data) {
			//success
			that.prices = data.prices;
			that.discounts = data.discounts;

			tracker.dispatch('checkout');

			that.populatePrices();
		});
	};

	//bunch more stuff
}

*/

/* Sample implementation in page template. No counters, no listeners! Wow!

var showRegistration = function() {
	$('#register').removeClass('hidden');
	$('#loading-message').remove();
};

var eventNames = ['checkout'];
var regEventTracker = eventTracker(eventNames, showRegistration, 3000);

var checkout = new SomeCheckoutThing(optionsObject, regEventTracker);

*/
