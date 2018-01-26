function RightMovement(width){
    this.width
    this.move = function(obj){
        if(obj.x > width ){
            obj.x = -obj.width;
        }

        obj.x += 1;
    }
}

function SineMovement(width, peak){
    this.x = 0;
    this.width = width;
    this.pf = Math.PI / (width / 2); //Periodicity Factor
    this.peak = peak;

    this.move = function(obj){
        if(obj.x > width ){
            this.x =  -obj.width * this.increase;
            obj.x = -obj.width;
        }
        
        obj.x++;
        //moveObject.y = (this.peak / 2 - (Math.sin(this.x) * this.peak / 2)) - moveObject.height / 2;
        obj.y = (this.peak / 2 - (sine(this.peak / 2, this.pf, obj.x, 0, 0))) - obj.height / 2;
        this.x += this.increase;
    }
}

function SideToSideMovement(){
    this.direction
    this.move = function(obj){

    }
}

function LeftOfSineMovement(){

}