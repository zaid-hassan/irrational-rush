export default class Character {
  constructor(game) {
    this.game = game;
    this.width = 100;
    this.height = 100;

    this.x = this.game.width * 0.5 - this.width;
    this.y = this.game.height - this.game.floor.height - this.height;

    this.velocityX = 0;
    this.velocityY = 0;
    this.acceleration = 5;
    this.deceleration = 8;
    this.gravity = 0.5;
    this.maxVelocityX = 15;
    this.maxVelocityY = 30;

    this.jumpForce = -12;
  }

  update(deltaTime) {
    const dt = deltaTime / 1000;

    const wasOnGround = this.game.floorManager.floorPool.some(
      (floor) =>
        !floor.available &&
        this.game.isColliding({ ...this, y: this.y + 1 }, floor)
    );

    const collidedFloor = this.game.floorManager.floorPool.find(
      (floor) => !floor.available && this.game.isColliding(this, floor)
    );
    console.log(collidedFloor)
    this.x -= this.game.floor.speedX * dt;

    const keys = this.game.keys;
    const left = keys.includes("ArrowLeft");
    const right = keys.includes("ArrowRight");
    const jump = keys.includes("ArrowUp");

    if (left) this.velocityX -= this.acceleration * dt;
    if (right) this.velocityX += this.acceleration * dt;

    if (!left && !right) {
      if (this.velocityX > 0) {
        this.velocityX = Math.max(0, this.velocityX - this.deceleration * dt);
      }
      if (this.velocityX < 0) {
        this.velocityX = Math.min(0, this.velocityX + this.deceleration * dt);
      }
    }

    this.velocityX = Math.max(
      -this.maxVelocityX,
      Math.min(this.velocityX, this.maxVelocityX)
    );

    const oldX = this.x;
    this.x += this.velocityX;

    if (collidedFloor) {
      this.x = oldX;
      this.velocityX = 0;
      console.log("coloi");
    }

    if (jump && wasOnGround) {
      this.velocityY = this.jumpForce;
    }

    this.velocityY += this.gravity;
    this.velocityY = Math.min(this.velocityY, this.maxVelocityY);

    this.y += this.velocityY;

    const floorBelow = this.game.floorManager.floorPool.find(
      (floor) => !floor.available && this.game.isColliding(this, floor)
    );

    if (floorBelow) {
      this.y = this.game.floor.y - this.height;
      this.velocityY = 0;
    }
  }

  draw() {
    const ctx = this.game.ctx;
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = "cyan";
    ctx.fill();
    ctx.closePath();
    // console.log('draw', this.x, this.y)
  }
}
