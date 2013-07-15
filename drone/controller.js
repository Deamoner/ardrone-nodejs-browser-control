/**
 * Created with JetBrains WebStorm.
 * User: rohitghatol
 * Date: 6/29/13
 * Time: 6:32 PM
 * To change this template use File | Settings | File Templates.
 */

var io = require('socket.io').listen(3002);
io.set('log level', 1);

io.sockets.on('connection', function (socket) {
    var arDrone = require('ar-drone');
    var client = arDrone.createClient();

    setInterval(function(){
        var batteryLevel = client.battery();
        socket.emit('event', { name: 'battery',value: batteryLevel});
    },1000);

    socket.on('event', function (data) {
        if(data.name=="takeoff"){
            console.log("Browser asked Ar Drone to Take Off");
            client.takeoff();
        }
        if(data.name=="spin"){
            console.log("Browser asked Ar Drone to Start Spinning");
            client.clockwise(1);
        }
        if(data.name=="stop"){
            console.log("Browser asked Ar Drone to Stay and Hover");
            client.stop();
        }
        if(data.name=="land"){
            console.log("Browser asked Ar Drone to Land");
            client.land();
        }
        if(data.name=="wave"){
            console.log("Browser asked Ar Drone to wave");
            client.animate('wave', 1500);
        }
        if(data.name=="led"){
            console.log("Browser asked Ar Drone to led");
            client.animateLeds('doubleMissile', 5, 7);
        }
        if(data.name=="reset"){
            console.log("Browser asked Ar Drone to reset");
            client.disableEmergency();
        }
        if(data.name=="config"){
            console.log("Browser asked Ar Drone to config");
            client.calibrate(0);
        }
              
        // Movement
              
              if(data.name=="front"){
              console.log("Browser asked Ar Drone to go forward");
              client.front(0.2);
              }
              
              if(data.name=="left"){
              console.log("Browser asked Ar Drone to go left");
              client.left(0.2);
              }
              
              if(data.name=="right"){
              console.log("Browser asked Ar Drone to right ");
              client.right(0.2);
              }
              
              if(data.name=="back"){
              console.log("Browser asked Ar Drone to back");
              client.back(0.2);
              }
              
              if(data.name=="raise"){
              console.log("raise");
              client.up(0.2);
              }
              if(data.name=="lower"){
              console.log("raise");
              client.down(0.2);
              }
    });
});
