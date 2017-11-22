// This creates a custom event called asyncSuccess and makes it available globally

var asyncSuccess = null;

// Check whether browser supports Event() (lookin' at you, IE)

if (Event) {
  asyncSuccess = new Event('asyncSuccess');
} else {
  asyncSuccess = document.createEvent('Event');
  asyncSuccess.initEvent('asyncSuccess', true, true);
}

/* Sample implementation ajax call

$.ajax({
  contentType: "application/json; charset=utf-8",
  type: 'GET',
  url: endpoint,
}).done(function (data) {
  //success
  that.prices = data.prices;
  that.discounts = data.discounts;

  document.dispatchEvent(asyncSuccess);

  that.populatePrices();
});

*/

/* Sample implementation in page template

var asyncCount = 0;

// Listens for asyncSuccess event. Adds 1 to the counter each time it's dispatched.
// When it gets to 2, display the form
this.addEventListener('asyncSuccess', function () {
  asyncCount++;
  if (asyncCount >= 2) {
    $('#form').removeClass('hidden');
    $('#message').remove();
  }
}, false);

*/

