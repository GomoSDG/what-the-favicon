function LeftMovement(){
    this.move = function(moveObject){
        moveObject.x += 1;
    }
}

function SineMovement(){
    this.x = 0;
    this.increase = Math.PI / 480;
    this.peak = 2;

    this.move = function(moveObject){
        moveObject.x++;
        moveObject.y = (this.peak / 2 - (Math.sin(this.x) * this.peak / 2)) - moveObject.height / 2;
        this.x += this.increase;
    }
}