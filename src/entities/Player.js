import { MovingEntity } from './MovingEntity.js';
import { CONFIG } from '../config.js';
import { audioManager } from '../audioManager.js';
export class Player extends MovingEntity {
  constructor(x, y) {
  
    const existingMarioEl = document.getElementById('mario');
    super(x, y, 20, 20, 'mario', existingMarioEl);
    this.big = false;
    this.bigTimer = 0;
  }

  handleInput(keys) {
    if (keys['ArrowLeft'] || keys['KeyQ']) {
      this.velocityX = -CONFIG.MOVE_SPEED;
      this.element.classList.add('facing_left');
    } else if (keys['ArrowRight'] || keys['KeyD']) {
      this.velocityX = CONFIG.MOVE_SPEED;
      this.element.classList.remove('facing_left');
    } else {
      this.velocityX *= 0.8;
    }

    if (keys['Space'] && this.grounded) {
      this.velocityY += CONFIG.JUMP_FORCE;
      this.grounded = false;
      audioManager.playSFX('jump');
    }
  }

  grow() {
    this.big = true;
    this.bigTimer = 600;
    this.element.classList.add('big');
    this.width = 30;
    this.height = 30;
  }

  shrink() {
    this.big = false;
    this.bigTimer = 0;
    this.element.classList.remove('big');
    this.width = 20;
    this.height = 20;
  }

  reset(x, y) {
    this.x = x;
    this.y = y;
    this.velocityX = 0;
    this.velocityY = 0;
    this.shrink();
  }

  update(keys, solids) {
    this.handleInput(keys);
    this.applyGravity();
    this.x += this.velocityX;
    this.y += this.velocityY;
    this.resolveGroundCollisions(solids);
    this.render();
  }
}