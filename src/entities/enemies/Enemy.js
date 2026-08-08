import { MovingEntity } from '../MovingEntity.js';
import { CollisionUtils } from '../../utils/CollisionUtils.js';
import { CONFIG } from '../../config.js';


export class Enemy extends MovingEntity {
  constructor(x, y, type, speed = CONFIG.ENEMY_SPEED) {
    super(x, y, 20, 20, `enemy ${type}`);
    this.type = type;
    this.direction = -1;
    this.speed = speed;
    this.alive = true;
  }

 patrol(platforms, pipes, levelWidth) { 
    this.x += this.speed * this.direction;
    if (this.shouldTurnAround(platforms, pipes, levelWidth)) {
      this.direction *= -1;
    }
}

  /** Redéfinissable par une sous-classe pour un comportement différent */
 shouldTurnAround(platforms, pipes, levelWidth) {
    const edgeMargin = 20;
    const onPlatform = platforms.some(p =>
      this.x + this.width > p.x + edgeMargin &&
      this.x < p.x + p.width - edgeMargin &&
      this.y + this.height >= p.y - 5 &&
      this.y + this.height <= p.y + 5
    );

    const margin = 5;
    const hitsPipe = pipes.some(pipe => {
      const expanded = { x: pipe.x - margin, y: pipe.y, width: pipe.width + margin * 2, height: pipe.height };
      return CollisionUtils.isColliding(this, expanded);
    });

    return !onPlatform || this.x <= 0 || this.x + this.width >= levelWidth || hitsPipe;
}

  die() {
    this.alive = false;
    this.remove();
  }

  update(platforms, pipes, levelWidth) { 
    if (!this.alive) return;
    this.patrol(platforms, pipes, levelWidth);
    this.render();
}

  /** Le joueur saute dessus -> renvoie les points gagnés */
  onStomped(player) {
    this.die();
    player.velocityY = CONFIG.JUMP_FORCE * 0.7;
    return 100;
  }

  /** Contact latéral -> renvoie true si le joueur doit perdre une vie */
  onTouchPlayer(player) {
    if (player.big) {
      player.shrink();
      return false;
    }
    return true;
  }
}
