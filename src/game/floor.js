export default class Floor {
  constructor(game) {
    this.game = game;
    this.width = this.game.width;
    this.height = 100;

    this.x = 0;
    this.y = this.game.height - this.height;

    this.speedX = 150;
  }

  update(deltaTime) {
    this.x -= this.speedX * (deltaTime / 1000);

    if (this.x <= -this.width) {
      this.x = 0;
    }
  }

  draw() {
    const ctx = this.game.ctx;
    ctx.beginPath();
    ctx.fillStyle = "blue";

    ctx.rect(this.x, this.y, this.width, this.height);

    ctx.fill();
    ctx.closePath();
  }
}
