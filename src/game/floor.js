export default class Floor {
  constructor(game) {
    this.game = game;
    this.width = this.game.width * .5;
    this.height = 100;

    this.x;
    this.y = this.game.height - this.height;

    this.color = "red";
    this.speedX = 70;

    this.available = true;
  }

  spawn() {
    this.available = false;
  }

  reset() {
    this.available = true;
    this.x;
  }

  update(deltaTime) {
    if (!this.available) {
      this.x -= this.speedX * (deltaTime / 1000);

      if (this.x <= -this.width) {
        this.reset();
      }
    }
  }

  draw() {
    if (!this.available) {
      this.speedX = 150;
      const ctx = this.game.ctx;
      ctx.beginPath();
      ctx.fillStyle = this.color;

      ctx.rect(this.x, this.y, this.width, this.height);

      ctx.fill();
      ctx.closePath();
    }
  }
}
