function LeftMovement(){
    this.move = function(moveObject){
        moveObject.x += 1;
    }
}

function SineMovement(width, peak){
    this.x = 0;
    this.width = width;
    this.increase = Math.PI / (width / 2);
    console.log(width);
    this.peak = peak;

    this.move = function(moveObject){
        if(moveObject.x > width ){
            this.x =  -moveObject.width * this.increase;
            moveObject.x = -moveObject.width;
        }
        
        moveObject.x++;
        moveObject.y = (this.peak / 2 - (Math.sin(this.x) * this.peak / 2)) - moveObject.height / 2;
        this.x += this.increase;
    }
}