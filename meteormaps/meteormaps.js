
Players = new Mongo.Collection("players");

if (Meteor.isClient) {

  Meteor.startup(function() {
    GoogleMaps.load();

    $(document).on('keydown', function (e) {
      switch(e.which) {
        case 37: // left
          player.angle -= 0.1;
          updateAngle()
          break;

        case 38: // up
          player.speed += 0.005;
          break;

        case 39: // right
          player.angle += 0.1;
          updateAngle()
          break;

        case 40: // down
          player.speed -= 0.005;
          break;

        default: return; // exit this handler for other keys
      }
      e.preventDefault(); // prevent the default action (scroll / move caret)
    });

    function updateAngle() {
      console.log("meteormaps.js:35");
      var angle = (player.angle / (2 * Math.PI)) * 360;
      angle = angle + "deg";
      $(".marker").attr("style","transform: rotate("+angle+");-webkit-transform: rotate("+angle+");-moz-transform: rotate("+angle+");-o-transform: rotate("+angle+");-ms-transform: rotate("+angle+");");
    }
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

  Template.map.onCreated(function() {
    // We can use the `ready` callback to interact with the map API once the map is ready.
    GoogleMaps.ready('exampleMap', function(map) {
      // Add a marker to the map once it's ready
      var marker = new google.maps.Marker({
        position: map.options.center,
        map: map.instance
      });

      player = {
        // preset of map options
        pos: new google.maps.LatLng(-37.8136, 144.9631),
        angle: 0,
        speed: 0.01
      };

      globalmap = {
        marker : marker,
        map : map
      };


      function move() {
        requestAnimationFrame(move);
        var pos = player.pos;

        pos.D += Math.sin(player.angle) * player.speed;
        pos.k += Math.cos(player.angle) * player.speed;

        globalmap.map.instance.setCenter(pos);
      }
      move();
    });

    Players.insert({
      // text: player
    });

  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
