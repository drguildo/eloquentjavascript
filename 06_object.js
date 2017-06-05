// @ts-check

// A vector type

function Vector(x, y) {
  this.x = x;
  this.y = y;
}
Vector.prototype.plus = other => new Vector(this.x + other.x, this.y + other.y);
Vector.prototype.minus = other => new Vector(this.x - other.x, this.y - other.y);
Object.defineProperty(Vector.prototype, "length", {
  get: () => Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
});


let a = new Vector(2, 4);
let b = new Vector(1, 3);

console.log(a, b);
