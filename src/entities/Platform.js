import { Entity } from './Entity.js';

export class Platform extends Entity {
  constructor(x, y, width, height, type) {
    super(x, y, width, height, `platform ${type}`);
    this.type = type;
    this.element.style.width = width + 'px';
    this.element.style.height = height + 'px';
  }
}
