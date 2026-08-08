import { BrownEnemy } from './BrownEnemy.js';
import { PurpleEnemy } from './PurpleEnemy.js';
import { Enemy } from './Enemy.js';


export class EnemyFactory {
  static create(x, y, type,speed) {
    switch (type) {
      case 'brown': return speed !=null ? new BrownEnemy(x, y,speed) :new BrownEnemy(x, y);
      case 'purple': return speed != null ? new PurpleEnemy(x, y, speed) : new PurpleEnemy(x, y);
      default: return new Enemy(x, y, type,speed);
    }
  }
}
