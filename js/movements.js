function LeftMovement(){
    this.move = function(moveObject){
        moveObject.x += 1;
    }
}

function SineMovement(){
    this.x = 0;
    this.increase = Math.PI / (480 / 2);
    this.peak = 2;

    this.move = function(moveObject){
        if(moveObject.x > 480 ){
            this.x =  this.increase;
            moveObject.x = -moveObject.width;
        }
        moveObject.x++;
        moveObject.y = (this.peak / 2 - (Math.sin(this.x) * this.peak / 2)) - moveObject.height / 2;
        this.x += this.increase;
    }
}