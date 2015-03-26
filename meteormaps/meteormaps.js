if (Meteor.isClient) {

  Meteor.startup(function() {
    GoogleMaps.load();
  });

  Template.body.helpers({
  	// preset of map options
    exampleMapOptions: function() {
      // Make sure the maps API has loaded
      if (GoogleMaps.loaded()) {
        // Map initialization options
        return {
          center: new google.maps.LatLng(-37.8136, 144.9631),
          zoom: 8
        };
      }
    }
  });

  Template.body.onCreated(function() {
    // We can use the `ready` callback to interact with the map API once the map is ready.
    GoogleMaps.ready('exampleMap', function(map) {
      // Add a marker to the map once it's ready
      var marker = new google.maps.Marker({
        position: map.options.center,
        map: map.instance
      });

      globalmap = {
        marker : marker,
        map : map
      };

      function move() {
        requestAnimationFrame(move);
        var pos = globalmap.marker.position;

        pos.D += .01;
        pos.k += .01;

        globalmap.map.instance.setCenter(pos);
        // globalmap.marker.setPosition(pos);
      }
      move();
    });
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
