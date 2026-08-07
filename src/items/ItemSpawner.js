import { CollisionUtils } from '../utils/CollisionUtils.js';
import { CONFIG } from '../config.js';


export class ItemSpawner {
  static spawnMushroom(block, platforms, gameArea) {
    const item = document.createElement('div');
    item.className = 'mushroom';
    gameArea.appendChild(item);

    const obj = { x: block.x, y: block.y - 20, width: 20, height: 20, velocityY: 0 };
    item.style.left = obj.x + 'px';
    item.style.top = obj.y + 'px';

    function fall() {
      obj.velocityY += CONFIG.GRAVITY;
      obj.y += obj.velocityY;

      const landed = platforms.some(p =>
        CollisionUtils.isColliding(obj, p) && obj.y + obj.height <= p.y + 5
      );
      if (landed) {
        item.remove();
        return;
      }
      item.style.top = obj.y + 'px';
      requestAnimationFrame(fall);
    }
    fall();
  }

  static spawnCoin(block, gameArea) {
    const item = document.createElement('div');
    item.className = 'coin';
    gameArea.appendChild(item);

    let y = block.y - 20;
    item.style.left = block.x + 'px';
    item.style.top = y + 'px';

    let frames = 0;
    const interval = setInterval(() => {
      y -= 1;
      item.style.top = y + 'px';
      frames++;
      if (frames >= 50) {
        clearInterval(interval);
        item.remove();
      }
    }, 5);
  }
}
