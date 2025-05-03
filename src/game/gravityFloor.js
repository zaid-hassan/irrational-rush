import Floor from "./floor";

export default class GravityFloor extends Floor {
    constructor(game) {
        super(game);

        this.color = 'blue';
        
        // this.gravity = 0.5;
        // this.velocityY = 0;
        // this.maxVelocityY = 20;
    }

    // upate(deltaTime) {
    //     super.update(deltaTime);

    //     const dt = deltaTime / 1000;

    //     // Apply gravity
    //     this.velocityY += this.gravity * dt;
    //     this.velocityY = Math.min(this.velocityY, this.maxVelocityY);

    //     // Update vertical position
    //     this.y += this.velocityY;

    //     // Optional: stop falling after reaching bottom of screen
    //     if (this.y > this.game.height - this.height) {
    //         this.y = this.game.height - this.height;
    //         this.velocityY = 0;
    //     }
    // }
}
