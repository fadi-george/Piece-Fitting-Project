import {axisLength, axisMinMax, deepCopy} from './PieceBlock.js';

export function newCubeMat(cubeDim) {
  return Array(...Array(cubeDim * cubeDim)).map(() => Array(cubeDim).fill(0));
}

export class CubeState {
  constructor(cubeMat, currentPieces, pieceIsometeries, pieceShifts) {
    this.cubeMat = cubeMat;
    this.currentPieces = currentPieces;
    this.pieceIsometeries = pieceIsometeries;
    this.pieceShifts = pieceShifts;
  }
}

export class StateQueue {
  constructor(cubeDim, totalPieces, Pieces) {
    this.cubeDim = cubeDim;
    this.totalPieces = totalPieces;
    this.Pieces = Pieces;
  }

  // State Queue - Depth First Search
  // [ Current Cube 3D Matrix ] , [ Current Pieces ] , [ Piece Isometries ] , [ Piece Shifts ]
  stateDepthFirstSearch(stateQueueElement) {

    let pieceIdx;
    let currentMat;
    //debugger;

    // Check previous configuration
    if (stateQueueElement) { // ------------------- If state element is not null
      pieceIdx = stateQueueElement.currentPieces;
      // console.log(stateQueueElement.cubeMat);
    } else {
      pieceIdx = 0;
    }

    // All pieces were placed, return configuration
    if (pieceIdx == this.totalPieces) {
      return stateQueueElement;
    }

    let posIsos = this.Pieces[pieceIdx].getUniqueIsometries();

    for (let i of posIsos) {

      let cubePos = this.Pieces[pieceIdx].getIsometry(i);

      let newRange = axisLength(cubePos);

      let bounds = axisMinMax(cubePos);
      let xDis = 0 - bounds[0][0]; // ---------------- How Far Piece's x-axis boundary is from origin
      let yDis = 0 - bounds[1][0]; // ---------------- How Far Piece's y-axis boundary is from origin
      let zDis = 0 - bounds[2][0]; // ---------------- How Far Piece's z-axis boundary is from origin

      let xFree = this.cubeDim - newRange[0] + 1; // ------ How Much Free Space in X-axis
      let yFree = this.cubeDim - newRange[1] + 1; // ------ How Much Free Space in Y-axis
      let zFree = this.cubeDim - newRange[2] + 1; // ------ How Much Free Space in Z-axis
      // xFree = Math.min(xFree, (this.cubeDim >> 1) + (this.cubeDim & 1));
      // yFree = Math.min(yFree, (this.cubeDim >> 1) + (this.cubeDim & 1));
      // zFree = Math.min(zFree, (this.cubeDim >> 1) + (this.cubeDim & 1));

      let cubePosShift = [];
      let currentPieces = pieceIdx + 1;
      let pieceIsometeries = [];
      let pieceShifts = [];

      if (pieceIdx) {
        currentMat = deepCopy(stateQueueElement.cubeMat);
        pieceIsometeries = [...stateQueueElement.pieceIsometeries];
      } else {
        currentMat = newCubeMat(3);
      }
      pieceIsometeries.push(i);

      // Determine How Much Shape can be shifted
      for (let x = 0; x < xFree; x++) {
        for (let y = 0; y < yFree; y++) {
          for (let z = 0; z < zFree; z++) {

            let posMap = cubePos.map(e => [
              (3 * (e[2] + zDis + z)) + e[0] + xDis + x,
              e[1] + yDis + y
            ]); // ------------------------------------------------------------------------------------------ (x,y,z) mapping to 2d matrix
            let cubeMatValues = posMap.map(e => currentMat[e[0]][e[1]]); // --------------------------------- Grab values from the cube matrix

            if (cubeMatValues.every(e => e == 0)) { // ------------------------------------------------------ Cube can fit piece

              let updatedMat = deepCopy(currentMat);

              let pieceShifts = [];
              if (pieceIdx) {
                pieceShifts = [...stateQueueElement.pieceShifts];
              }
              pieceShifts.push([x + xDis, y + yDis, z + zDis]);

              posMap.map(e => (updatedMat[e[0]][e[1]] = this.Pieces[pieceIdx].pieceID)); // ----------------------------------------------- Place 1s into cube matrix to indicate filled spot

              let temp = this.stateDepthFirstSearch(new CubeState(updatedMat, currentPieces, pieceIsometeries, pieceShifts));
              if (temp != null) {
                return temp;
              }

            }

          }
        }
      }

    }
    return null;
  }
}
