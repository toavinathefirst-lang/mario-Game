import { Enemy } from './Enemy.js';
import { CONFIG } from '../../config.js';


export class PurpleEnemy extends Enemy {
  constructor(x, y,speed = CONFIG.ENEMY_SPEED * 1.1) {
    super(x, y, 'purple',speed);
  }

  patrol(platforms, pipes) {
    
    super.patrol(platforms, pipes);
  }
}
