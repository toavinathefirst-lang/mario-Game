import { CollisionUtils } from '../utils/CollisionUtils.js';

/**
 * Classe de base pour TOUT ce qui est affiché dans #game_area.
 * Gère uniquement : position, taille, élément DOM, rendu, collision.
 */
export class Entity {
  /**
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   * @param {string} className
   * @param {HTMLElement|null} existingElement Réutilise cet élément DOM au lieu
   *   d'en créer un nouveau (utile pour #mario, déjà présent dans le HTML).
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