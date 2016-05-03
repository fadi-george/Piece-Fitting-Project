export class CubeState {
  constructor(cubeMat, currentPieces, pieceIsometeries, pieceShifts) {
    this.cubeMat = cubeMat;
    this.currentPieces = currentPieces;
    this.pieceIsometeries = pieceIsometeries;
    this.pieceShifts = pieceShifts;
  }
}

export function newCubeMat(cubeDim) {
  return Array(...Array(cubeDim * cubeDim)).map(() => Array(cubeDim).fill(0));
}
