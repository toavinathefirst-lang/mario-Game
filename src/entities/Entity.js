import { CollisionUtils } from '../utils/CollisionUtils.js';

export class Entity {
  /**
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   * @param {string} className
   * @param {HTMLElement|null} existingElement 
   */
  constructor(x, y, width, height, className, existingElement = null) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.element = existingElement || document.createElement('div');
    this.element.className = className;
  }

  render() {
    this.element.style.left = this.x + 'px';
    this.element.style.top = this.y + 'px';
  }

  remove() {
    this.element.remove();
  }

  collidesWith(other) {
    return CollisionUtils.isColliding(this, other);
  }
}