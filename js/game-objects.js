function Sprite(x, y, w, h, movement, renderer){
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.movement = movement;
    this.renderer = renderer;

    this.move = function(){
        movement.move(this);
    }

    this.draw = function(ctx){
        renderer.draw(this, ctx);
    }
}

function Square(x,y,s, movement){
    Sprite.call(this, x, y, s, s, movement)

    this.draw = function(){

    }
}



function Ship(){
    this.draw = function(obj, ctx){
        ctx.beginPath();
        ctx.moveTo(obj.x + (obj.width / 2), obj.y);
        ctx.lineTo(obj.x, obj.y + obj.height);
        ctx.lineTo(obj.x + obj.width, obj.y + obj.height);
        ctx.lineTo(obj.x + obj.width / 2, obj.y);
        ctx.closePath();
        ctx.fill();
    }
}