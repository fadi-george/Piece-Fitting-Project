import readInput from './readInput.js';

import {
  PieceBlock,
  axisLength,
  axisMinMax
} from './PieceBlock.js';

import {
  CubeState,
  newCubeMat
} from './cubeMat.js';

// Read Inputs (Synchronous Read)
// -----------------------------------------------------------------------------
let loadedPieces = readInput('./src/Input.txt');
let pieceNames = [];
let Pieces = [];

// Generate Names
// -----------------------------------------------------------------------------
for (let i = 0; i < loadedPieces[1]; i++) {
  pieceNames.push('piece' + String.fromCharCode(65 + i));
  Pieces.push(new PieceBlock(loadedPieces[i + 2], pieceNames[i]));
}

// State Queue - Breadth First Search
// [ Current Cube 3D Matrix ] , [ Current Pieces ] , [ Piece Isometries ] , [ Piece Shifts ]
// -----------------------------------------------------------------------------
let idx = 0;
let cubeDim = loadedPieces[0];
let stateQueue = [];
let stateQueueIdx = 0;

//while (stateQueue.length) {
let posIsos = Pieces[idx].getUniqueIsometries();
let currentMat;

for (let i of posIsos) {

  let cubePos = Pieces[idx].getIsometry(i);
  let newRange = axisLength(cubePos);

  let bounds = axisMinMax(cubePos);
  let xDis = 0 - bounds[0][0];
  let yDis = 0 - bounds[1][0];
  let zDis = 0 - bounds[2][0];

  let xFree = cubeDim - newRange[0] + 1; // ------ How Much Free Space in X-axis
  let yFree = cubeDim - newRange[1] + 1; // ------ How Much Free Space in Y-axis
  let zFree = cubeDim - newRange[2] + 1; // ------ How Much Free Space in Z-axis

  let cubePosShift = [];

  if (idx) {
    currentMat = stateQueue[stateQueueIdx].cubeMat;
  } else {
    currentMat = newCubeMat(3);
  }

  // Determine How Much Shape can be shifted
  for (let x = 0; x < xFree; x++) {
    for (let y = 0; y < yFree; y++) {
      for (let z = 0; z < zFree; z++) {

        //cubePosShift.push([x,y,z]);
      }
    }
  }
  console.log(cubePosShift);
  break;

}
stateQueueIdx++;

//}
//pieceShifts
