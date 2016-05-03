import readInput from './readInput.js';
import {PieceBlock, axisLength, axisMinMax, deepCopy} from './PieceBlock.js';
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

// State Queue - Depth First Search
// [ Current Cube 3D Matrix ] , [ Current Pieces ] , [ Piece Isometries ] , [ Piece Shifts ]
// -----------------------------------------------------------------------------
let cubeDim = piecesData[0];
let totalPieces = piecesData[1];
let stateQueue = [];
let stateQueueIdx = 0;
let isDoneSearching = false;

while (!isDoneSearching) { // ------------------------ Hasnt Found a Cube State with all Pieces Yet

  let posIsos; // ----------------------------------- To store unique isometries for some piece
  let currentMat; // -------------------------------- Current State of the Cube
  let currentPieces; // ----------------------------- How many pieces currently in the Cube
  let pieceIsometeries; // ----------------------------
  let pieceShifts;
  let pieceIdx;

  // ---------------------------------------------------------------------------
  // Check Queue Element
  if (stateQueue.length) {
    pieceIdx = stateQueue[stateQueueIdx].currentPieces;
  } else {
    pieceIdx = 0;
  }

  // ---------------------------------------------------------------------------
  // Check if State has all Pieces Fitted In
  if (pieceIdx == totalPieces) {
    isDoneSearching = true;
    break;
  }

  posIsos = Pieces[pieceIdx].getUniqueIsometries();
  for (let i of posIsos) {

    let cubePos = Pieces[pieceIdx].getIsometry(i);
    let newRange = axisLength(cubePos);

    let bounds = axisMinMax(cubePos);
    let xDis = 0 - bounds[0][0]; // ---------------- How Far Piece's x-axis boundary is from origin
    let yDis = 0 - bounds[1][0]; // ---------------- How Far Piece's y-axis boundary is from origin
    let zDis = 0 - bounds[2][0]; // ---------------- How Far Piece's z-axis boundary is from origin

    let xFree = cubeDim - newRange[0] + 1; // ------ How Much Free Space in X-axis
    let yFree = cubeDim - newRange[1] + 1; // ------ How Much Free Space in Y-axis
    let zFree = cubeDim - newRange[2] + 1; // ------ How Much Free Space in Z-axis
    xFree = Math.min(xFree, (cubeDim >> 1) + (cubeDim & 1));
    yFree = Math.min(yFree, (cubeDim >> 1) + (cubeDim & 1));
    zFree = Math.min(zFree, (cubeDim >> 1) + (cubeDim & 1));

    let cubePosShift = [];
    currentPieces = pieceIdx + 1;

    if (pieceIdx) {
      currentMat = stateQueue[stateQueueIdx].cubeMat;
      pieceIsometeries = stateQueue[stateQueueIdx].pieceIsometeries;
      pieceShifts = stateQueue[stateQueueIdx].pieceShifts;
      pieceIsometeries.push(i);
    } else {
      currentMat = newCubeMat(3);
      pieceIsometeries = i;
    }

    // Determine How Much Shape can be shifted
    for (let x = 0; x < xFree; x++) {
      for (let y = 0; y < yFree; y++) {
        for (let z = 0; z < zFree; z++) {

          let isValidShift = true;
          let posMap = cubePos.map(e => [
            (3 * (e[2] + zDis)) + e[0] + xDis,
            e[1] + yDis
          ]); // ------------- (x,y,z) mapping to 2d matrix
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

  }
  stateQueueIdx++;
  break;
}
