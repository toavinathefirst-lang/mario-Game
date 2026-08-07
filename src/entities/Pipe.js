import { Entity } from './Entity.js';

export class Pipe extends Entity {
  constructor(x, y, size = 40) {
    super(x, y, size, size, 'pipe');
    ['pipe_top', 'pipe_top_right', 'pipe_bottom', 'pipe_bottom_right'].forEach(cls => {
      const part = document.createElement('div');
      part.className = cls;
      this.element.appendChild(part);
    });
  }
}
