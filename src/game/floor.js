export default class Floor {
    constructor(game) {
        this.game = game;
        this.width = this.game.width * .70;
        this.height = 100;
        this.x = this.game.width - this.width;
        this.y = this.game.height - this.height;
        this.speed = 0;
    }
    update() {
        if (this.x < - this.width) {
            this.x = this.game.width;
        }
        this.x -= this.speed;
    }
    draw() {
        this.game.ctx.beginPath();
        this.game.ctx.rect(this.x, this.y, this.width, this.height);
        this.game.ctx.fillStyle = "blue";
        this.game.ctx.fill();
    }
}