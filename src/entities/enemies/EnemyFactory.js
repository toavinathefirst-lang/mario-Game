import { BrownEnemy } from './BrownEnemy.js';
import { PurpleEnemy } from './PurpleEnemy.js';
import { Enemy } from './Enemy.js';


export class EnemyFactory {
  static create(x, y, type) {
    switch (type) {
      case 'brown': return new BrownEnemy(x, y);
      case 'purple': return new PurpleEnemy(x, y);
      default: return new Enemy(x, y, type);
    }
  }
}
