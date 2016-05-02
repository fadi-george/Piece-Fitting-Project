import {readInput} from './readInput.js';
import PieceBlock from './PieceBlock.js';

// Read Inputs (Synchronous Read)
// -----------------------------------------------------------------------------
let loadedPieces = readInput('./src/fileInput.txt');
let pieceNames = [];
let Pieces = [];

// Generate Names
// -----------------------------------------------------------------------------
for (let i = 0; i < loadedPieces[1]; i++) {
  pieceNames.push('piece' + String.fromCharCode(65 + i));
  Pieces.push(new PieceBlock(loadedPieces[i + 2], pieceNames[i]));
}

// State Queue - Breadth First Search
// -----------------------------------------------------------------------------
console.log(Pieces);
