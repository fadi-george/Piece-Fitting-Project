export default function readInput(path) {

  let objOut = [];
  let idx = 0;
  let tempCubeCount = -1;
  let tempCubeMats = [];

  //  Read Input File
  let fs = require('fs');
  let lines = fs.readFileSync(path).toString().split('\n');

  objOut.push(parseInt(lines[0])); // ------------------------ Dimension of Cube
  objOut.push(parseInt(lines[1])); // ------------------ Number of Pieces to Fit
  for (let i = 3; i < lines.length; i++) {
    if (tempCubeCount > 0) {
      tempCubeMats.push(lines[i].split(' ').map(Number));
      tempCubeCount--;

    } else if (tempCubeCount == 0) { // ---------------------- Skip Piece number
      objOut.push(tempCubeMats);
      tempCubeCount = -1;
      tempCubeMats = [];

    } else {
      tempCubeCount = parseInt(lines[i]);
    }
  }

  return objOut;
}
