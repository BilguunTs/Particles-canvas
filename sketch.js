const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [2048, 2048],
  animate: true,
};
const numberOfParticles = 150;
const getDistance = (x1, x2, y1, y2) => {
  const disX = x2 - x1;
  const disY = y2 - y1;
  return Math.sqrt(Math.pow(disX, 2) + Math.pow(disY, 2));
};
const sketch = () => {
  let circles = [];
  for (let i = 0; i < numberOfParticles; i++) {
    circles.push(
      new Circle(Math.random() * 2048, Math.random() * 2048, Math.random() * 20)
    );
  }

  return ({ context: ctx, width, height }) => {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "black";
    for (let i = 0; i < circles.length; i++) {
      const circle1 = circles[i];
      for (let j = i + 1; j < circles.length; j++) {
        const circle2 = circles[j];
        const dist = getDistance(circle1.x, circle2.x, circle1.y, circle2.y);

        if (dist < 250) {
          ctx.lineWidth = 10 - dist / 25;
          ctx.beginPath();
          ctx.moveTo(circle1.x, circle1.y);
          ctx.lineTo(circle2.x, circle2.y);
          ctx.stroke();
        }
      }
    }

    circles.forEach((circle) => {
      circle.draw(ctx);
      circle.move();
      circle.setBoundary(width, height);
    });
  };
};

canvasSketch(sketch, settings);
class Circle {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.velocityX = Math.random() * 4 - 2; //number between [-2,2];
    this.velocityY = Math.random() * 4 - 2; //number between [-2,2];
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = "white";
    ctx.fill();
  }
  move() {
    this.x += this.velocityX;
    this.y += this.velocityY;
  }
  setBoundary(width, height) {
    if (this.x <= this.radius || this.x >= width - this.radius) {
      this.velocityX *= -1;
    }
    if (this.y <= this.radius || this.y >= height - this.radius) {
      this.velocityY *= -1;
    }
  }
}
