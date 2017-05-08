Solution: Generation Take-Home Coding Challenge
=================================
This is my approach to solve the Coding Challenge from Generation.
I will use react/redux, because I'm starting to learning, and this is an excelent excersice.

My first step was to analyze the user stories and mockup a friendly solution.

![mockup](?raw=true)

After the creation of the mockup, I defined the components/containers to create.
 * Global App __Component__. _Already provided by the challenge_.
 * Map __container__. Will interact with the redux-state, to fetch the markers from a reducer.
 * Stores-List __container__. Will interact with redux-state to get the list of <stores, favourite_stores> reducers.
 * Store __Component__. Will display the information delivered by the list. As an individual element.

 __________
 ## Geocoding the markers

We get a JSON with the stores, but unfourtenately we only get the name and address of the store, to be able to show the
marker, we need the location from GMaps, we will have to _geocode_ the address.
We will use the [Geocoding Service](https://google-developers.appspot.com/maps/documentation/javascript/examples/geocoding-simple),
afterwards we will paint the markers.
 _Note:_ I realized that the address provided by the JSON sometimes can't fetch the location for extra info in the string.
 we will have to trim the string or solve this.
