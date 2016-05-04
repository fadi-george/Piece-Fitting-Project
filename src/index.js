import readInput from './readInput.js';
import {PieceBlock, deepCopy} from './PieceBlock.js';
import {CubeState, newCubeMat} from './cubeMat.js';

// Read Inputs (Synchronous Read)
// [0] - Cube Dimension , [1] Number of Pieces , [2+] Cube Positions as Seperate 2D arrays
// -----------------------------------------------------------------------------
let piecesData = readInput('./src/Input.txt');
let pieceNames = [];
let Pieces = [];

// Generate Names
// -----------------------------------------------------------------------------
for (let i = 0; i < piecesData[1]; i++) {
  pieceNames.push('piece' + String.fromCharCode(65 + i));
  Pieces.push(new PieceBlock(piecesData[i + 2], pieceNames[i]));
}
