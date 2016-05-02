export default class PieceBlock {

  constructor(cubePositions, pieceID) {
    this.cubePositions = cubePositions; // -------------- Positions of Each Cube
    this.numCubes = cubePositions.length; // ------- Number of Cubes Composed of
    this.pieceID = pieceID;
    this.axesLength = Array(3).fill(0); // --------- How many cubes per axis (x , y , z)

    for (let i = 0; i < cubePositions.length; i++) {
      if (cubePositions[i][0]) {
        this.axesLength[0]++;
      }
      if (cubePositions[i][1]) {
        this.axesLength[1]++;
      }
      if (cubePositions[i][2]) {
        this.axesLength[2]++;
      }
    }
  }

  getUniqueIsometries() {
    let possibleIsos = [];

    if (this.numCubes == 1) {
      return this.cubePositions;
    }

    if (this.axesLength[0]) {
      if (this.axesLength[1]) {
        if (this.axesLength[2]) { // ----------------------------- [ x , y , z ]

        } else { // ---------------------------------------------- [ x , y , 0 ]

        }
      } else {
        if (this.axesLength[2]) { // ----------------------------- [ x , 0 , z ]

        } else { // ---------------------------------------------- [ x , 0 , 0 ]

        }
      }
    } else {
      if (this.axesLength[1]) {
        if (this.axesLength[2]) { // ----------------------------- [ 0 , y , z ]

        } else { // ---------------------------------------------- [ 0 , y , 0 ]

        }
      } else {
        if (this.axesLength[2]) { // ----------------------------- [ 0 , 0 , z ]

        }
      }
    }

  }

  isoMeteryCases(isoCase) {

    let newPos = deepCopy(this.cubePositions);

    for (let i = 0; i < isoCases.length; i++) {

      if (isoCases[i] == 1) { // --------------------------------- [ x , y , z ]
        return newPos;

      } else if (isoCases[i] == 2) { // -------------------------- [ y , x , z ]
        for (let i in newPos) {
          [newPos[i][0], newPos[i][1]] = [newPos[i][1], newPos[i][0]];
        }

      } else if (isoCases[i] == 3) { // -------------------------- [ z , x , y ]
        for (let i in newPos) {
          [newPos[i][0], newPos[i][1], newPos[i][2]] = [newPos[i][2], newPos[i][0], newPos[i][1]];
        }

      } else if (isoCases[i] == 4) { // ------------------------- [ -y , x , z ]
        for (let i in newPos) {
          [newPos[i][0], newPos[i][1]] = [-newPos[i][1], newPos[i][0]];
        }

      } else if (isoCases[i] == 5) { // ------------------------- [ -z , y , x ]
        for (let i in newPos) {
          [newPos[i][0], newPos[i][2]] = [-newPos[i][2], newPos[i][0]];
        }
      }
    }
  }
}

let deepCopy = function(arr) {
  return JSON.parse(JSON.stringify(arr));
};

let swapTwoElements = function(value, index, array1) {
  console.log(array1);
  //[arr[j], arr[i]] = [arr[i], arr[j]];
};
