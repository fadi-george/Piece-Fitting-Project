export default function readInput(path) {

  let objOut = [];
  let idx = 0;
  let tempCubeCount = -1;
  let tempCubeMats = [];

  //  Read Input File
  let fs = require('fs');
  let lines = fs.readFileSync(path).toString().split('\n'); // Tokenize using New Line

  objOut.push(parseInt(lines[0])); // ------------------------ Dimension of Cube
  objOut.push(parseInt(lines[1])); // ------------------ Number of Pieces to Fit

  for (let i = 3; i < lines.length; i++) {
    if (tempCubeCount > 0) {
      tempCubeMats.push(lines[i].split(' ').map(Number)); // -- Read X,Y,Z Coordinate for Cubes
      tempCubeCount--;

    } else if (tempCubeCount == 0) { // ---------------------- Skip Piece Number
      objOut.push(tempCubeMats);     // ---------------------- Read all Cube Positions, push to output data
      tempCubeCount = -1;
      tempCubeMats = [];

    } else {
      tempCubeCount = parseInt(lines[i]);
    }
  }

  // ------------------------------ First Piece Cube Positions , Second Piece Cube Positions , ....
  // [ CubeDim , Number of Pieces , [[x1,y1,z1],[x2,y2,z2],...] , [[x1,y1,z1],[x2,y2,z2],...] , ... ]
  return objOut;
}
