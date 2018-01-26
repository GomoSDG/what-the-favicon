function straight(x, m, c){
    /**
     * x: x
     * m: Gradiant
     * c: Y intercept
     */
    return x * m + c;
}

function sine(a, k, x, b, c){
    /**
     * a: Amplitude
     * k: Periodicity Factor
     * x: Theta
     * b: Horizontal Shift
     * c: Vertical Shift
     */
    k *= Math.PI
    return a * Math.sin(k * (x - b) + c);
}

function quadratic(a, b, c, x){

}

function exponential(a, b, x){

}

function GraphMovementContainer(v, f){
    this.values = v;
    this.f = f;

    this.getY = function(x){

    }
}