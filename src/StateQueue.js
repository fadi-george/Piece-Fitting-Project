import {axisLength, axisMinMax} from './PieceBlock.js';

// 3D Matrix expressed as 2D Matrix
// if cube dimension is 3, matrix is 9 x 3 with the first three rows being one layer of the cube
export function newCubeMat(cubeDim) {
  return Array(...Array(cubeDim * cubeDim)).map(() => Array(cubeDim).fill(0));
}

// Current of the Cube after rotation and shifting some pieces
export class CubeState {
  constructor(cubeMat, currentPieces, pieceIsometeries, pieceShifts) {
    this.cubeMat = cubeMat;
    this.currentPieces = currentPieces;
    this.pieceIsometeries = pieceIsometeries;
    this.pieceShifts = pieceShifts;
  }
}

// Depth-First Searcher
export class StateQueue {

  // Values to reference as depth-first searcher is performed
  constructor(cubeDim, totalPieces, Pieces) {
    this.cubeDim = cubeDim;
    this.totalPieces = totalPieces;
    this.Pieces = Pieces; // All the piece objects including their id and cube positions
    this.cubeMat = newCubeMat(cubeDim); // create new empty cube matrix
  }

  // State Queue - Depth First Search
  // Checks CubeState element for filled matrix otherwise keeps searching for a valid configuration
  stateDepthFirstSearch(stateQueueElement) {

    let pieceIdx;

    // Check previous configuration
    if (stateQueueElement) { // ------------------- If state element is not null
      pieceIdx = stateQueueElement.currentPieces;
    } else {
      pieceIdx = 0;
    }

    // All pieces were placed, return configuration
    if (pieceIdx == this.totalPieces) {
      return stateQueueElement;
    }

    let currentPieces = pieceIdx + 1;
    let pieceIsometeries;

    let cubePos;
    let cubePosShift;
    let newRange;
    let bounds;
    let pieceShifts;

    let posMap;
    let cubeMatValues;

    let x;     let y;     let z;
    let xFree; let yFree; let zFree;

    let posIsos = this.Pieces[pieceIdx].uniqueIsos; // unique positions for all isometries
    let isoCases = this.Pieces[pieceIdx].uniqueIsoCases; // isometries represented as cases

    for (let i in posIsos) {

      cubePos = posIsos[i];
      newRange = axisLength(cubePos);
      bounds = axisMinMax(cubePos);

      xFree = this.cubeDim - newRange[0] + 1; // ------ How Much Free Space in X-axis
      yFree = this.cubeDim - newRange[1] + 1; // ------ How Much Free Space in Y-axis
      zFree = this.cubeDim - newRange[2] + 1; // ------ How Much Free Space in Z-axis

      pieceIsometeries = [];
      pieceShifts = [];
      if (pieceIdx) {
        pieceIsometeries = [...stateQueueElement.pieceIsometeries];
      }
      pieceIsometeries.push(isoCases[i]); // push order of valid isometries

      // Determine How Much Shape can be shifted
      for (x = 0; x < xFree; x++) {
        for (y = 0; y < yFree; y++) {
          for (z = 0; z < zFree; z++) {

            // -------------------------------------------------------------------------------------------- (x,y,z) mapping to 2d matrix
            posMap = cubePos.map(e => [
              (this.cubeDim * (e[2] + z)) + e[0] + x,
              e[1] + y
            ]);
            cubeMatValues = posMap.map(e => this.cubeMat[e[0]][e[1]]); // --------------------------------- Grab values from the cube matrix

            if (cubeMatValues.every(e => e == 0)) { // ---------------------------------------------------- Cube can fit piece

              pieceShifts = [];
              if (pieceIdx) {
                pieceShifts = [...stateQueueElement.pieceShifts];
              }
              pieceShifts.push([x, y, z]);

              // place piece and update the matrix
              posMap.map(e => (this.cubeMat[e[0]][e[1]] = this.Pieces[pieceIdx].pieceID));

              let temp = this.stateDepthFirstSearch(new CubeState(this.cubeMat, currentPieces, pieceIsometeries, pieceShifts));

              // return element if on next call, all other pieces fit
              if (temp != null) {
                return temp;
              }

              // otherwise, restore matrix back to when piece wasnt placed
              posMap.map(e => (this.cubeMat[e[0]][e[1]] = 0));

            }

          }
        }
      }

    }

    // piece couldnt fit into matrix
    return null;
  }
}
