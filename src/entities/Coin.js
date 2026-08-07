import { Entity } from './Entity.js';

export class Coin extends Entity {
  constructor(x, y, size = 20) {
    super(x, y, size, size, 'coin');
    this.collected = false;
  }

  collect() {
    this.collected = true;
    this.remove();
  }
}
