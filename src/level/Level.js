import { Platform } from '../entities/Platform.js';
import { Pipe } from '../entities/Pipe.js';
import { Coin } from '../entities/Coin.js';
import { SurpriseBlock } from '../entities/SurpriseBlock.js';
import { EnemyFactory } from '../entities/enemies/EnemyFactory.js';

export class Level {
  constructor(data, gameArea) {
    this.data = data;
    this.gameArea = gameArea;
    this.platforms = [];
    this.enemies = [];
    this.coins = [];
    this.surpriseBlocks = [];
    this.pipes = [];
  }

  load() {
    this.data.platforms.forEach(d => this._spawn(this.platforms, new Platform(d.x, d.y, d.width, d.height, d.type)));
    this.data.enemies.forEach(d => this._spawn(this.enemies, EnemyFactory.create(d.x, d.y, d.type)));
    this.data.coins.forEach(d => this._spawn(this.coins, new Coin(d.x, d.y)));
    this.data.surpriseBlocks.forEach(d => this._spawn(this.surpriseBlocks, new SurpriseBlock(d.x, d.y, d.type)));
    this.data.pipes.forEach(d => this._spawn(this.pipes, new Pipe(d.x, d.y)));
  }

  _spawn(list, entity) {
    this.gameArea.appendChild(entity.element);
    entity.render();
    list.push(entity);
  }

  /** "sols" solides utilisés pour la gravité (plateformes + tuyaux) */
  get solids() {
    return [...this.platforms, ...this.pipes];
  }

  clear() {
    [...this.platforms, ...this.enemies, ...this.coins, ...this.surpriseBlocks, ...this.pipes]
      .forEach(e => e.remove());
    this.platforms = [];
    this.enemies = [];
    this.coins = [];
    this.surpriseBlocks = [];
    this.pipes = [];
  }
}
