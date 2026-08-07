
export class CollisionUtils {
  static isColliding(a, b) {
    return (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    );
  }

  /** true si "a" est en train de tomber sur "b" */
  static isLandingOn(a, b) {
    return a.velocityY > 0 && this.isColliding(a, b);
  }
}