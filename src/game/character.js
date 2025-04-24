export default class Character {
  constructor(game) {
    this.game = game;
    this.width = 100;
    this.height = 100;
    this.x = this.game.width * .5 - this.width;
    this.y = this.game.height - this.game.floor.height - this.height * 2;
  }
  update() {
    if (!this.game.isColliding(this, this.game.floor)) {
      this.y++;
    }
  }
  draw() {
    this.game.ctx.beginPath();
    this.game.ctx.rect(this.x, this.y, this.width, this.height);
    this.game.ctx.fillStyle = "cyan";
    this.game.ctx.fill();
  }
}
