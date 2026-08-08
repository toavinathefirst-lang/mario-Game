import { Enemy } from './Enemy.js';
import { CONFIG } from '../../config.js';
/** Comportement standard, hérité tel quel de Enemy. */
export class BrownEnemy extends Enemy {
  constructor(x, y,speed = CONFIG.ENEMY_SPEED*0.8) {
    super(x, y, 'brown', speed);
  }
}
