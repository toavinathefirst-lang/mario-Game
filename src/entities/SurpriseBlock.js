import { Entity } from './Entity.js';

export class SurpriseBlock extends Entity {
  constructor(x, y, type, size = 20) {
    super(x, y, size, size, 'surprise_block');
    this.type = type;
    this.hit = false;
  }

  /** @param {(block: SurpriseBlock) => void} onFirstHit */
  activate(onFirstHit) {
    if (this.hit) return;
    this.hit = true;
    this.element.classList.add('hit');
    onFirstHit(this);
  }
}
