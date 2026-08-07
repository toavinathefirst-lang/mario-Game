import { CONFIG } from '../config.js';

export class LevelBuilder {
  constructor(tileSize = CONFIG.TILE_SIZE) {
    this.tileSize = tileSize;
    this.data = { platforms: [], enemies: [], coins: [], surpriseBlocks: [], pipes: [] };
  }

  /**
   * @param {number} colStart case de départ (colonne)
   * @param {number} colSpan  largeur en nombre de cases
   * @param {number} row      ligne (rangée)
   * @param {string} type     'ground' | 'floating' | 'blue' | ...
   * @param {number} rowSpan  hauteur en nombre de cases (def: 1)
   */
  platform(colStart, colSpan, row, type, rowSpan = 1) {
    this.data.platforms.push({
      x: colStart * this.tileSize,
      y: row * this.tileSize,
      width: colSpan * this.tileSize,
      height: rowSpan * this.tileSize,
      type,
    });
    return this;
  }

  enemy(col, row, type) {
    this.data.enemies.push({ x: col * this.tileSize, y: row * this.tileSize, type });
    return this;
  }

  coin(col, row) {
    this.data.coins.push({ x: col * this.tileSize, y: row * this.tileSize });
    return this;
  }

  surpriseBlock(col, row, type) {
    this.data.surpriseBlocks.push({ x: col * this.tileSize, y: row * this.tileSize, type });
    return this;
  }

  pipe(col, row) {
    this.data.pipes.push({ x: col * this.tileSize, y: row * this.tileSize });
    return this;
  }

  build() {
    return this.data;
  }
}
