import { Entity } from './Entity.js';
import { CONFIG } from '../config.js';

/**
 * Tout ce qui a une vélocité + subit la gravité + peut atterrir sur un sol.
 * Player ET Enemy en héritent : plus de code de gravité/atterrissage dupliqué.
 */
export class MovingEntity extends Entity {
  constructor(x, y, width, height, className, existingElement = null) {
    super(x, y, width, height, className, existingElement);
    this.velocityX = 0;
    this.velocityY = 0;
    this.grounded = false;
  }

  applyGravity() {
    this.velocityY += CONFIG.GRAVITY;
  }

  /** @param {Array<{x:number,y:number,width:number,height:number}>} solids */
  resolveGroundCollisions(solids) {
    this.grounded = false;
    for (const solid of solids) {
      if (this.velocityY > 0 && this.collidesWith(solid)) {
        this.y = solid.y - this.height;
        this.velocityY = 0;
        this.grounded = true;
      }
    }
  }
}