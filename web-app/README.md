To run you can use: npm run start

I'm using @googlemaps/react-wrapper as a Library to show the map and render the points

Map and Maker components are using to rendering the map preview.

To fetch all boutiques I'm using the getAllPoints at services/BoutiqueService,ts file and using findLastClosestPoints to get the 5 closests stores from the current location.

App file is the main component basically, including get currect location, call the services and wrapping another components.
