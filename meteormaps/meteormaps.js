
Players = new Mongo.Collection("players");

if (Meteor.isClient) {

  Meteor.startup(function() {
    GoogleMaps.load();

    $(document).on('keydown', function (e) {
      switch(e.which) {
        case 37: // left
          console.log("meteormaps.js:8", "left");
          break;

        case 38: // up
          console.log("meteormaps.js:12", "up");
          break;

        case 39: // right
          break;

        case 40: // down
          break;

        default: return; // exit this handler for other keys
      }
      e.preventDefault(); // prevent the default action (scroll / move caret)
    });
  });

  Template.map.helpers({
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

  var player = {
  	// preset of map options
    pos: {
      D: 0,
      k: 0
    },
    angle: 40,
    speed: 0.1
  };

  Template.map.onCreated(function() {
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

    Players.insert({
      text: player
    });
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
