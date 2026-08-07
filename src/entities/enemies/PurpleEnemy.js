import { Enemy } from './Enemy.js';
import { CONFIG } from '../../config.js';


export class PurpleEnemy extends Enemy {
  constructor(x, y) {
    super(x, y, 'purple');
  }

  patrol(platforms, pipes) {
    this.speed = CONFIG.ENEMY_SPEED * 1.3;
    super.patrol(platforms, pipes);
  }
}
