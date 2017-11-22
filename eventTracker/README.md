# eventTracker

I was asked to figure out a way to delay rendering of a registration form until the API calls had finished, because users with slower connections, who started filling out the form before it was ready, experienced errors. Obviously that was unacceptable for event registration, especially with tiered pricing and limited space for registrants.

First I wrote a very simple JS file to create a custom event called asyncSuccess and make it available globally. Then I added code to the various ajax calls to dispatch the event when the calls completed successfully. Finally, in the registration page template I added a counter and a listener. When an asyncSuccess event was dispatched, it would increase the counter by 1, and when it got to 2 it would reveal the registration form.

Obviously there were issues with this approach.

* Tracking event counts rather than named events exposes the page to "events are happening but my page is busted" type problems.
* Splitting up the jobs of registering the event handler and checking whether the events have fired makes it harder to reason through and debug.
* Using a hardcoded number of events in the logic increases the likelihood of bugs if new API calls are added.
* Cluttering up the template with a counter, event listener, and associated logic is a bad idea.

My solution was to write a function which creates an object to handle creation and tracking of specific named events and which invokes a callback when they've all been dispatched. 

