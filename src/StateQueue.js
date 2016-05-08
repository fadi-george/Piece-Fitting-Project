import {axisLength, axisMinMax} from './PieceBlock.js';

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
    this.cubeMat = newCubeMat(cubeDim);
  }

  // State Queue - Depth First Search
  // [ Current Cube 3D Matrix ] , [ Current Pieces ] , [ Piece Isometries ] , [ Piece Shifts ]
  stateDepthFirstSearch(stateQueueElement) {

    let pieceIdx;
    let cubePos; let cubePosShift;
    let newRange;
    let bounds;
    let pieceShifts;

    let posMap;
    let cubeMatValues;

    let x;     let y;     let z;
    let xDis;  let yDis;  let zDis;
    let xFree; let yFree; let zFree;

    // Check previous configuration
    if (stateQueueElement) { // ------------------- If state element is not null
      pieceIdx = stateQueueElement.currentPieces;
    } else {
      pieceIdx = 0;
    }

    let currentPieces = pieceIdx + 1;
    let pieceIsometeries;

    // All pieces were placed, return configuration
    if (pieceIdx == this.totalPieces) {
      return stateQueueElement;
    }
    let posIsos = this.Pieces[pieceIdx].getUniqueIsometries();

    for (let i of posIsos) {

      cubePos = this.Pieces[pieceIdx].performIsometry(i);
      newRange = axisLength(cubePos);
      bounds = axisMinMax(cubePos);

      xDis = 0 - bounds[0][0]; // ---------------- How Far Piece's x-axis boundary is from origin
      yDis = 0 - bounds[1][0]; // ---------------- How Far Piece's y-axis boundary is from origin
      zDis = 0 - bounds[2][0]; // ---------------- How Far Piece's z-axis boundary is from origin

      xFree = this.cubeDim - newRange[0] + 1; // ------ How Much Free Space in X-axis
      yFree = this.cubeDim - newRange[1] + 1; // ------ How Much Free Space in Y-axis
      zFree = this.cubeDim - newRange[2] + 1; // ------ How Much Free Space in Z-axis

      pieceIsometeries = [];
      pieceShifts = [];
      if (pieceIdx) {
        pieceIsometeries = [...stateQueueElement.pieceIsometeries];
      }
      pieceIsometeries.push(i);

      // Determine How Much Shape can be shifted
      for (x = 0; x < xFree; x++) {
        for (y = 0; y < yFree; y++) {
          for (z = 0; z < zFree; z++) {

            // -------------------------------------------------------------------------------------------- (x,y,z) mapping to 2d matrix
            posMap = cubePos.map(e => [(this.cubeDim * (e[2] + zDis + z)) + e[0] + xDis + x, e[1] + yDis + y]);
            cubeMatValues = posMap.map(e => this.cubeMat[e[0]][e[1]]); // --------------------------------- Grab values from the cube matrix

            if (cubeMatValues.every(e => e == 0)) { // ------------------------------------------------------ Cube can fit piece

              pieceShifts = [];
              if (pieceIdx) {
                pieceShifts = [...stateQueueElement.pieceShifts];
              }
              pieceShifts.push([x + xDis, y + yDis, z + zDis]);

              posMap.map(e => (this.cubeMat[e[0]][e[1]] = this.Pieces[pieceIdx].pieceID)); // ----------------------------------------------- Place 1s into cube matrix to indicate filled spot
              let temp = this.stateDepthFirstSearch(new CubeState(this.cubeMat, currentPieces, pieceIsometeries, pieceShifts));
              if (temp != null) {
                return temp;
              }
              posMap.map(e => (this.cubeMat[e[0]][e[1]] = 0));

            }

          }
        }
      }

    }
    return null;
  }
}
