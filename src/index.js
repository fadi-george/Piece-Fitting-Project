import readInput from './readInput.js';
import {PieceBlock} from './PieceBlock.js';
import {StateQueue} from './StateQueue.js';

// Read Inputs (Synchronous Read)
// [0] - Cube Dimension , [1] Number of Pieces , [2+] Cube Positions as Seperate 2D arrays
// -----------------------------------------------------------------------------
let piecesData = readInput('./src/Input.txt');
let Pieces = [];
//console.log(piecesData);

// Create PieceBlock objects with names A, B, ... , G
// -----------------------------------------------------------------------------
for (let i = 0; i < piecesData[1]; i++) {
  Pieces.push(new PieceBlock(piecesData[i + 2], String.fromCharCode(65 + i)));
}

// Sort by number of unique isometries
Pieces.sort((a,b) => (b.uniqueIsos.length - a.uniqueIsos.length));

// Create State Depth First Searcher Object
// -----------------------------------------------------------------------------
console.time('solver');
let cubeDim = piecesData[0];
let totalPieces = piecesData[1];
let states = new StateQueue(cubeDim, totalPieces, Pieces);
let solvedState = states.stateDepthFirstSearch(null);
console.log(solvedState.cubeMat);
console.timeEnd('solver');
