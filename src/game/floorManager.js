import Floor from "./floor";
import GravityFloor from "./gravityFloor";

export default class FloorManager {
  constructor(game) {
    this.game = game;

    this.pattern = "2121212112212111212221"; // Your spawn pattern
    this.patternIndex = 0;

    this.floorType = [
      {
        floorId: "1",
        class: Floor,
      },
      {
        floorId: "2",
        class: GravityFloor,
      },
    ];

    this.floorPool = [];
    this.lastFloorX = 0; // Keep track of the last floor position

    this.createFloorPool();
  }

  // Create floor pool for reusing floor objects
  createFloorPool() {
    this.floorType.forEach((floor) => {
      if (!this.floorPool.some((fi) => fi instanceof floor.class)) {
        const newFloor = new floor.class(this.game);
        newFloor.available = true; // Mark as available when created
        this.floorPool.push(newFloor);
      }
    });

    console.log("Floor Pool: ", this.floorPool);
  }

  // Get floor class by typeKey
  getFloor(typeKey) {
    const floor = this.floorType.find((floor) => floor.floorId === typeKey);
    return floor;
  }

  // Handle floor spawning based on the pattern and floor positions
  handleFloorSpawn() {
    const typeKey = this.pattern.charAt(this.patternIndex);
    const floor = this.getFloor(typeKey);

    if (floor) {
      // Try to find an available floor instance from the pool
      let floorInstance = this.floorPool.find(
        (fi) => fi instanceof floor.class && fi.available
      );

      if (!floorInstance) {
        // If no available floor, create a new instance
        floorInstance = new floor.class(this.game);
        floorInstance.available = true; // Mark the newly created floor as available
        this.floorPool.push(floorInstance); // Add the new floor to the pool
      }

      // Position the floor right after the last one
      floorInstance.spawn();
      floorInstance.x = this.lastFloorX; // Ensure the new floor starts after the last one

      // Update lastFloorX to the new floor's end position
      this.lastFloorX = floorInstance.x + floorInstance.width;

      // Log to check if the floors are spawning correctly
      console.log(`Spawned floor at: ${floorInstance.x}`);

      // Mark the floor as unavailable after spawning
      floorInstance.available = false;
    }

    // Move to the next pattern position
    this.patternIndex++;

    console.log(this.floorPool)
    // Loop the pattern when the end is reached
    if (this.patternIndex >= this.pattern.length) {
      this.patternIndex = 0;
    }
  }
}
