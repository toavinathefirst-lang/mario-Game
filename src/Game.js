import { Player } from './entities/Player.js';
import { Level } from './level/Level.js';
import { ItemSpawner } from './items/ItemSpawner.js';
import { levels } from './data/levels.js';
import { CONFIG } from './config.js';

import { AudioManager } from './audioManager.js';
export class Game {
  constructor() {
    this.levelsData = levels;
    this.gameArea = document.getElementById('game_area');
    this.state = { score: 0, level: 1, lives: 3, running: true, keys: {} };
    this.player = new Player(50, 340);
    this.gameArea.appendChild(this.player.element);
    this.currentLevel = null;
    this.audioManager=new AudioManager()

    this._bindInput();
    document.getElementById('restart_button').addEventListener('click', () => this.restart());
  }

  _bindInput() {
    document.addEventListener('keydown', e => {
      this.state.keys[e.code] = true;
      if (e.code === 'Space') e.preventDefault();
    });
    document.addEventListener('keyup', e => { this.state.keys[e.code] = false; });
  }

  start() {
    this._loadLevel(this.state.level - 1);
    this.audioManager.playBGM();
    this._loop();
  }

  _loadLevel(index) {
    if (index >= this.levelsData.length) {
      this._gameOver(true);
      return;
    }
    if (this.currentLevel) this.currentLevel.clear();
    this.currentLevel = new Level(this.levelsData[index], this.gameArea);
    this.currentLevel.load();
    this.player.reset(50, 340);
  }

  _loop() {
    if (!this.state.running) return;
    this._update();
    requestAnimationFrame(() => this._loop());
  }

  _update() {
    const level = this.currentLevel;
    this.player.update(this.state.keys, level.solids);
    this._updateEnemies(level);
    this._handleCoins(level.coins);
    this._handleSurpriseBlocks(level);
    this._handlePipeTransition(level.pipes);
    this._checkFallDeath();
    this._refreshHUD();
  }

  _updateEnemies(level) {
    for (const enemy of level.enemies) {
      enemy.update(level.platforms, level.pipes);
      if (!enemy.alive) continue;

      if (this.player.collidesWith(enemy)) {
        const jumpingOnTop = this.player.velocityY > 0 && this.player.y < enemy.y;
        if (jumpingOnTop) {
          this.state.score += enemy.onStomped(this.player);
        } else if (enemy.onTouchPlayer(this.player)) {
          this._loseLife();
        }
      }
    }
  }

  _handleCoins(coins) {
    for (const coin of coins) {
      if (!coin.collected && this.player.collidesWith(coin)) {
        coin.collect();
        this.state.score += 50;
      }
    }
  }

  _handleSurpriseBlocks(level) {
    for (const block of level.surpriseBlocks) {
      if (this.player.collidesWith(block) && this.player.velocityY < 0) {
        this.player.velocityY = 0;
        this.player.y = block.y + block.height;

        block.activate(b => {
          if (b.type === 'mushroom') {
            ItemSpawner.spawnMushroom(b, level.platforms, this.gameArea);
            this.player.grow();
            this.state.score += 100;
          } else if (b.type === 'coin') {
            ItemSpawner.spawnCoin(b, this.gameArea);
            this.state.score += 50;
          }
        });
      }
    }
  }

  _handlePipeTransition(pipes) {
    for (const pipe of pipes) {
      const overPipe = this.player.grounded &&
        this.player.x + this.player.width > pipe.x &&
        this.player.x < pipe.x + pipe.width &&
        Math.abs(this.player.y + this.player.height - pipe.y) < 5;

      if (overPipe && this.state.keys['ArrowDown']) {
        this._nextLevel();
      }
    }
  }

  _checkFallDeath() {
    if (this.player.y > CONFIG.FALL_DEATH_Y) this._loseLife();
  }

  _loseLife() {
    this.state.lives--;
    if (this.state.score >= 10) this.state.score -= 10;

    if (this.state.lives <= 0) {
      this._gameOver(false);
    } else {
      this.player.reset(50, 340);
    }
  }

  _nextLevel() {
    this.state.level++;
    if (this.state.level > this.levelsData.length) {
      this._gameOver(true);
    } else {
      this._loadLevel(this.state.level - 1);
    }
  }

  _gameOver(won) {
    this.state.running = false;
    document.getElementById('game_over_title').textContent =
      won ? 'Félicitations, vous avez gagné !' : 'Game Over !';
    document.getElementById('final_score').textContent = this.state.score;
    document.getElementById('game_over').style.display = 'block';
    
  }

  _refreshHUD() {
    document.getElementById('score').textContent = this.state.score;
    document.getElementById('level').textContent = this.state.level;
    document.getElementById('lives').textContent = this.state.lives;
  }

  restart() {
    this.state.score = 0;
    this.state.level = 1;
    this.state.lives = 3;
    this.state.running = true;
    this.state.keys = {};
    document.getElementById('game_over').style.display = 'none';
    this.start();
  }
}
