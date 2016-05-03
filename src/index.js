import readInput from './readInput.js';

import {
  PieceBlock,
  axisLength,
  axisMinMax,
  deepCopy
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
let currentPieces;
let pieceIsometeries;
let pieceShifts;

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
    currentPieces = stateQueue[stateQueueIdx].currentPieces;
    pieceIsometeries = stateQueue[stateQueueIdx].pieceIsometeries;
    pieceShifts = stateQueue[stateQueueIdx].pieceShifts;

    currentPieces.push(idx + 1);
    pieceIsometeries.push(i);

  } else {
    currentMat = newCubeMat(3);
    currentPieces = idx + 1;
    pieceIsometeries = i;
    console.log(currentMat);
  }
  console.log(cubePos);

  // Determine How Much Shape can be shifted
  for (let x = 0; x < xFree; x++) {
    for (let y = 0; y < yFree; y++) {
      for (let z = 0; z < zFree; z++) {

        let isValidShift = true;
        let posMap = cubePos.map(e => [(3 * (e[2] + zDis)) + e[0] + xDis, e[1] + yDis]); // ------------- (x,y,z) mapping to 2d matrix
        let cubeMatValues = posMap.map(e => currentMat[e[0]][e[1]]); // --------------------------------- grab values from the cube matrix

        if (cubeMatValues.indexOf(1) < 0) { // ---------------------------------------------------------- Cube can fit piece
          cubePosShift.push([x, y, z]);
        }
      }
    }
  }
  console.log(cubePosShift);

  for (let shift in cubePosShift) {
    //stateQueue.push( new CubeState(cubeMat, currentPieces, pieceIsometeries, pieceShifts) );
  }
  break;

}
stateQueueIdx++;


//}
//pieceShifts