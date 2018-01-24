function GameObject(x, y, w, h, movement){
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.movement = movement;

    this.move = function(){
        movement.move(this);
    }
}

function Square(x,y,s, movement){
    GameObject.call(this, x, y, s, s, movement)
}