import { Enemy } from './Enemy.js';

/** Comportement standard, hérité tel quel de Enemy. */
export class BrownEnemy extends Enemy {
  constructor(x, y) {
    super(x, y, 'brown');
  }
}
