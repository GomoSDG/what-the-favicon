app = angular.module('myGame', []);
    
app.controller('sdgGame', ['$scope', '$log', function($scope, $log){

}]);

app.factory('devicesContainer', function(){
    var devices = {}

    return {
        setDevice: function(key, device){
            devices[key] = device;
        },
        getDevice: function(key){
            return devices[key];
        }
    }
})

app.factory('gameLoop', ['$interval', 'devicesContainer', function($interval, devicesContainer){
    var gameObjects = []
    var loop;
    var ctx = null;
    var screen = null;

    function draw(gameObject){
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(gameObject.x, gameObject.y, gameObject.width, gameObject.height);

        ctx.beginPath();
        ctx.moveTo(0, screen.height/2);
        ctx.lineTo(screen.width, screen.height/2);
        ctx.stroke();
    }

    function hook(){
        initialiseScreen()
        $.each(gameObjects, function(index, gameObject){
            gameObject.move();

            draw(gameObject)
        })
    }

    function initialiseScreen(){
        if(ctx === null){
            ctx = devicesContainer.getDevice('ctx');
        }
        
        if(screen === null){
            screen = devicesContainer.getDevice('screen');
        }
        
        ctx.clearRect(0, 0, screen.width, screen.height)
    }

    return {
        addGameObject: function(gameObject){
            gameObjects.push(gameObject);
        },
        removeGameObject: function(gameObject){
            const index = gameObjects.indexOf(gameObject);
            gameObjects.splice(index, 1);
            return true;
        },
        start: function(){
            loop = $interval(hook, 16);
        },
        stop: function(){
            if(loop !== null)
                $interval.cancel(loop);
            
            loop=null;
        }
    }
}])

app.directive('sdgGameScreen', ['devicesContainer', 'gameLoop', function(devicesContainer, gameLoop){
    function link(scope, element, attrs){
        container = $(element);
        screen = container.find('canvas')[0];
        devicesContainer.setDevice('screen', screen);
        devicesContainer.setDevice('ctx', screen.getContext("2d"));

        movement = new SineMovement();
        movement.peak = screen.height;
        //movement.peak=50;

        gameLoop.addGameObject(new Square(0, 0, 20, movement))
        gameLoop.start();
        
    }

    return {
        templateUrl: "templates/game-screen.html",
        restrict: 'E',
        link: link
    }
}])