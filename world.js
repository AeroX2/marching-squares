class Circle {
  constructor(x,y,r) {
	this.x = x;
	this.y = y;
	this.r = r;
	
	this.vx = Math.random() * 10;
	this.vy = Math.random() * 10;
  }
  
  update(canvas) {
	this.x += this.vx;
	this.y += this.vy;
	
	if (this.x < this.r) {
	  this.x = this.r;
	  this.vx *= -1;
	}
    if (this.x > canvas.width - this.r) {
	  this.x = canvas.width - this.r;
	  this.vx *= -1;
	}
	
	if (this.y < this.r) {
	  this.y = this.r;
      this.vy *= -1;
	}		
	if (this.y > canvas.height - this.r) {
	  this.y = canvas.height - this.r;
	  this.vy *= -1;
	}
  }
}

class World {
  constructor(canvas, ctx) {
	this.canvas = canvas;
	this.ctx = canvas.getContext("2d");
    this.circles = Array.from({length: 10}, () => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const r = Math.random() * 150;
      return new Circle(x,y,r);
	});
  }
  
  formula = (x0, y0) => {
    return this.circles.reduce((acc, circle) => (
      acc + Math.pow(circle.r,2) / (Math.pow((circle.x - x0),2) + Math.pow((circle.y - y0),2))
	), 0);
  };
  
  update = () => {
	this.circles.forEach(circle => circle.update(canvas));
	
	this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    march(this.ctx, this.formula);
	
	requestAnimationFrame(this.update);
  };
}