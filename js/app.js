app = angular.module('myGame', []);
    
app.controller('sdgGameCtrl', ['$scope', '$log', function($scope, $log){

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

app.controller('sdgControlPanelCtrl', ['$scope', '$sdg_player', function($scope, $sdg_player){

}]);

app.directive('sdgControlPanel', ['$sdg_player', function($sdg_player){
    function link(scope){
        scope.player = $sdg_player.getPlayer();
        console.log(scope);
    }
    return {
        templateUrl: 'templates/game-control-panel.html',
        link: link
    }
}]);

app.factory('gameLoop', ['$interval', 'devicesContainer', function($interval, devicesContainer){
    var gameObjects = []
    var loop;
    var ctx = null;
    var screen = null;

    function drawOrigin(origin){
        ctx.setLineDash([5, 10]);/*dashes are 5px and spaces are 3px*/
        ctx.beginPath();
        ctx.moveTo(0, origin.y);
        ctx.lineTo(screen.width, origin.y);
        ctx.stroke();

        ctx.setLineDash([5, 10]);/*dashes are 5px and spaces are 3px*/
        ctx.beginPath()
        ctx.moveTo(origin.x, 0);
        ctx.lineTo(origin.x, screen.height);
        ctx.stroke()
    }

    function hook(){
        initialiseScreen()
        $.each(gameObjects, function(index, gameObject){
            var origin = gameObject.movement.origin;
            drawOrigin(origin);
            gameObject.move();
            gameObject.draw(ctx);
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

app.factory('$sdg_player', ['devicesContainer', 'gameLoop', function(devicesContainer, gameLoop){
    _player = {};

    function setPlayer(player){
        _player = player;
    };

    function getPlayer(){
        return _player;
    }

    return {
        setPlayer: setPlayer,
        getPlayer: getPlayer
    }
}]);

app.directive('sdgGameScreen', ['devicesContainer', 'gameLoop', '$sdg_player', function(devicesContainer, gameLoop, $sdg_player){
    function link(scope, element, attrs){
        container = $(element);
        screen = container.find('canvas')[0];
        devicesContainer.setDevice('screen', screen);
        devicesContainer.setDevice('ctx', screen.getContext("2d")); 
        
        movement = new SineMovement({x: 240, y: 20}, 480, screen.width, 20);
        renderer = new Ship();
        movement.peak=50;
        $sdg_player.setPlayer(new Sprite(0, 0, 20, 20, movement, renderer));
        console.log($sdg_player.getPlayer().movement.origin);
        gameLoop.addGameObject($sdg_player.getPlayer());
        
        gameLoop.start();
    }

    return {
        templateUrl: "templates/game-screen.html",
        restrict: 'E',
        link: link
    }
}])