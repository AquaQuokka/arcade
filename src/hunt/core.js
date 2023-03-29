// Get a random number from 0 to "size".

        $("#retry").text("Click the map to play!")

        var get_random_number = function(size) {
            return Math.floor(Math.random() * size);
        };

        // Calculate the difference between click event ("event") and "target".
        var get_distance = function(event, target) {
            var x_diff = event.offsetX - target.x;
            var y_diff = event.offsetY - target.y;
            return Math.sqrt((x_diff * x_diff) + (y_diff * y_diff));
        };

        // Get the appropriate hint for the distance.
        var get_distance_hint = function(distance) {
            if(distance < 20) {
                return "*clunk* (You're melting!)";
            } else if(distance < 120) {
                return "There's something shiny about " + Math.floor(distance) + "m away! (You're burning up!)";
            } else if(distance < 220) {
                return "*rattle rattle* (It's getting kinda hot in here...)";
            } else if(distance < 320) {
                return "You can see a shovel sticking out of the ground. (It's nice and warm. How cozy.)";
            } else if(distance < 420) {
                return "Nothing here... (It's a little chilly...)";
            } else if(distance < 520) {
                return "The terrain is very flat. (Your teeth are chattering.)";
            } else {
                return "You like sand. How fortunate. (You can't even feel your body, it's so cold.)";
            }
        };

        // Initiate the basic variables.
        var width = 400;
        var height = 400;
        var clicks = 0;

        // Initiate the variable "target".
        var target = {
            x: get_random_number(width),
            y: get_random_number(height)
        };

        $("#remaining").text(25 - clicks);
        
        $("#retry").click(function(event) {
            if(document.getElementById("retry").textContent !== "Click the map to play!") {
                location.reload();
            }
        });

        $("#map").click(function(event) {

            $("#retry").text("Play Again \u21BB");


            if(clicks >= 24) {
                alert("Some pirates swooped through and stole the treasure before you...")
                location.reload();
            }
            clicks++;


            $("#remaining").text(25 - clicks);

            var distance = get_distance(event, target);
            var distance_hint = get_distance_hint(distance);

            $("#distance").text(distance_hint);
            $("#metres").text(Math.floor(distance) + "m");

            if (distance <= 16) {
                alert("Found the treasure in " + clicks + " clicks!");
                location.reload();
            }
        });