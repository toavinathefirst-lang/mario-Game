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

  const level3 = new LevelBuilder()
  // Sol principal en alternant 'ground' et 'blue' (spawn libre entre col 0 et 8)
  .platform(0, 8, 18, 'ground', 2)
  .platform(12, 6, 18, 'blue', 2)
  .platform(22, 6, 18, 'ground', 2)
  .platform(32, 8, 18, 'blue', 2)

  // Plateformes flottantes
  .platform(8, 3, 14, 'floating')
  .platform(18, 3, 12, 'floating')
  .platform(28, 3, 14, 'floating')

  // Ennemis (uniquement 'brown' et 'purple', placés loin du spawn x=50)
  .enemy(14, 17, 'brown')
  .enemy(24, 17, 'purple')
  .enemy(34, 17, 'brown')

  // Pièces
  .coin(9, 12)
  .coin(19, 10)
  .coin(29, 12)

  // Blocs surprise
  .surpriseBlock(14, 13, 'mushroom')
  .surpriseBlock(24, 13, 'coin')

  // Tuyau final
  .pipe(37, 16)
  .build();

  const level4 = new LevelBuilder()
 
  .platform(0, 6, 18, 'blue', 2)
  .platform(11, 4, 18, 'ground', 2)
  .platform(20, 3, 18, 'blue', 2)
  .platform(28, 4, 18, 'ground', 2)
  .platform(37, 5, 18, 'blue', 2)

  
  .platform(7, 2, 15, 'floating')
  .platform(10, 1, 12, 'floating')
  .platform(16, 2, 14, 'floating')
  .platform(24, 2, 11, 'floating')
  .platform(27, 1, 14, 'floating')
  .platform(33, 2, 13, 'floating')

  // Plus forte concentration d'ennemis
  .enemy(12, 17, 'purple')
  .enemy(17, 13, 'brown')
  .enemy(21, 17, 'purple')
  .enemy(29, 17, 'brown')
  

  // Pièces risquées
  .coin(8, 13)
  .coin(11, 10)
  .coin(25, 9)
  .coin(34, 11)

  // Blocs surprise limités
  .surpriseBlock(17, 10, 'mushroom')
  .surpriseBlock(30, 13, 'coin')

  // Tuyau final
  .pipe(38, 16)
  .build();



export const levels = [level1, level2,level3,level4];
