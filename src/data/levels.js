import { LevelBuilder } from '../level/LevelBuilder.js';



const level1 = new LevelBuilder()
  // sol
  .platform(0, 20, 18, 'ground', 2)
  .platform(25, 15, 18, 'ground', 2)
  // plateformes flottantes
  .platform(10, 3, 14, 'floating')
  .platform(15, 3, 12, 'floating')
  .platform(30, 4, 14, 'floating')
  // ennemis
  .enemy(12, 17, 'brown')
  .enemy(27, 17, 'brown')
  // pièces
  .coin(11, 13)
  .coin(16, 11)
  .coin(31, 13)
  // bloc surprise
  .surpriseBlock(16, 9, 'mushroom')
  // tuyau vers le niveau suivant
  .pipe(37, 16)
  .build();

const level2 = new LevelBuilder()
  // sol en 3 blocs séparés
  .platform(0, 10, 18, 'blue', 2)
  .platform(15, 10, 18, 'blue', 2)
  .platform(30, 10, 18, 'blue', 2)
  // escalier de plateformes flottantes
  .platform(7, 2, 15, 'blue')
  .platform(12, 2, 14, 'blue')
  .platform(17, 2, 13, 'blue')
  .platform(22, 2, 12, 'blue')
  .platform(27, 3, 14, 'blue')
  // ennemis
  .enemy(17, 17, 'purple')
  .enemy(32, 17, 'purple')
  .enemy(28, 13, 'purple')
  // pièces le long de l'escalier
  .coin(8, 14)
  .coin(13, 13)
  .coin(18, 12)
  .coin(23, 11)
  .coin(28, 13)
  // blocs surprise
  .surpriseBlock(10, 11, 'coin')
  .surpriseBlock(20, 10, 'mushroom')
  // tuyau
  .pipe(37, 16)
  .build();

export const levels = [level1, level2];
