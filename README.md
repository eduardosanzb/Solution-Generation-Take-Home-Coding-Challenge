Solution: Generation Take-Home Coding Challenge
=================================
This is my approach to solve the Coding Challenge from Generation.
I will use react/redux, because I'm starting to learning, and this is an excellent exercise.

My first step was to analyze the user stories and mockup a friendly solution.

![mockup](https://github.com/eduardosanzb/Solution-Generation-Take-Home-Coding-Challenge/blob/master/generation-take-home/Screen%20Shot%202017-01-16%20at%203.21.35%20AM.png?raw=true)

After the creation of the mockup, I defined the components/containers to create.
 * Global App __Component__. _Already provided by the challenge_.
 * Map __container__. Will interact with the redux-state, to fetch the markers from a reducer.
 * Stores-List __container__. Will interact with redux-state to get the list of <stores, favourite_stores> reducers.
 * Store __Component__. Will display the information delivered by the list. As an individual element.

 __________
 ## Geocoding the markers

We get a JSON with the stores, but unfortunately we only get the name and address of the store, to be able to show the
marker, we need the location from GMaps, we will have to _geocode_ the address.
We will use the [Geocoding Service](https://google-developers.appspot.com/maps/documentation/javascript/examples/geocoding-simple),
afterwards we will paint the markers.
 [Project MarkersCreator](https://github.com/eduardosanzb/Solution-Generation-Take-Home-Coding-Challenge/tree/master/markersCleaner)

To to that, I approach by creating a node utility, that read all the stores, and geolocated with the API. After that, I saved those locations
in a json.

I want to fetch those locations to the _react app_ by a service, so I created a simple express server, to send those locations.
Also, there is a POST service, Cuz maybe I will attach the functionality to add more stores to the app. Was not in the requirements tho.

[SERVER for the generation stores](https://github.com/eduardosanzb/Solution-Generation-Take-Home-Coding-Challenge/tree/master/server)

This service is running in a small server I have for testing.

http://dalet.tk:5000/

http://dalet.tk:5000/api/locations => to fetch all the locations json

If the server is down, you can run an instance in [SERVER for the generation stores](https://github.com/eduardosanzb/Solution-Generation-Take-Home-Coding-Challenge/tree/master/server)
running `node dist/index.js`, but you have to change the url in the [action_creators](https://github.com/eduardosanzb/Solution-Generation-Take-Home-Coding-Challenge/blob/master/generation-take-home/src/actions/index.js)
`const URL_LOCATIONS = 'http://localhost:5000/api/locations'`


