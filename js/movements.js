function RightMovement(width){
    this.width
    this.move = function(obj){
        if(obj.x > width ){
            obj.x = -obj.width;
        }

        obj.x += 1;
    }
}

function SineMovement(origin, wavelength, width, a){
    this.wavelength = wavelength;
    this.width = width
    this.pf = 1 / (wavelength / 2); //Periodicity Factor
    this.origin = origin;
    this.a = a;

    this.move = function(obj){
        if(obj.x > width )
            obj.x = -obj.width;
        else
            obj.x += 1.5;

        obj.y = (this.origin.y - sine(this.a, this.pf, obj.x + this.origin.x, 240, 0)) - obj.height / 2;
    }
}

function SideToSideMovement(){
    this.direction
    this.move = function(obj){

    }
}

function ComposeMovement(l, r){
    this.move = function(obj){
        
    }
}