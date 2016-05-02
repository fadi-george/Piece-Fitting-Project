/**
 * Babel Starter Kit (https://www.kriasoft.com/babel-starter-kit)
 *
 * Copyright © 2015-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
import {readInput} from './readInput.js';
import PieceBlock from './PieceBlock.js';

// Read Inputs (Synchronous Read)
let loadedPieces = readInput('./src/fileInput.txt');
let pieceNames = [];

// Generate Names
for (let i = 0; i < loadedPieces[1]; i++) {
  pieceNames.push('piece' + String.fromCharCode(65 + i));
}
console.log(pieceNames);
