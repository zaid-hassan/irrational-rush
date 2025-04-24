import Character from "./character";
import Floor from "./floor";

export default class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.width = canvas.width;
    this.height = canvas.height;

    this.floor = new Floor(this);
    this.character = new Character(this);

    this.lastTime = 0;
    this.animationId = null;
    this.handleResize = this.handleResize.bind(this);
    this.animate = this.animate.bind(this);
    
    this.start();
  }

  isColliding(rect1, rect2) {
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
    );
  }
  

  start() {
    this.resize(window.innerWidth, window.innerHeight);
    this.addEventListeners();
    this.animationId = requestAnimationFrame(this.animate);
  }

  resize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
  }

  handleResize(e) {
    this.resize(e.target.innerWidth, e.target.innerHeight);
  }

  addEventListeners() {
    window.addEventListener("resize", this.handleResize);
  }

  removeEventListeners() {
    window.removeEventListener("resize", this.handleResize);
  }

  animate(timestamp) {
    const deltaTime = timestamp - this.lastTime;
    this.lastTime = timestamp;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.render(deltaTime);

    this.animationId = requestAnimationFrame(this.animate);
  }

  render(deltaTime) {
    this.floor.update(deltaTime);
    this.floor.draw();
    this.character.update(deltaTime);
    this.character.draw();
  }

  stop() {
    cancelAnimationFrame(this.animationId);
    this.removeEventListeners();
  }
}
