export default class PieceBlock {

  constructor(cubePositions, pieceID) {
    this.cubePositions = cubePositions; // -------------- Positions of Each Cube
    this.numCubes = cubePositions.length; // ------- Number of Cubes Composed of
    this.pieceID = pieceID;
    this.axesLength = axisLength(cubePositions);
  }

  getUniqueIsometries() {
    let allIsos = [...Array(24).keys()].map(x => ++x);

    if (this.numCubes == 1) {
      return [1];
    }

    if (this.axesLength[0] > 1) {
      if (this.axesLength[1] > 1) {
        if (this.axesLength[2] > 1) { // ------------------------- [ * , * , * ]

        } else { // ---------------------------------------------- [ * , * , 0 ]
          if (this.axesLength[0] == this.axesLength[1]) { // *x == *y
            // (*,*,0) , (0,*,*) , (-*,0,*) , (-*,-*,0) , (0,-*,*) , (*,-*,0) , (*,0,*) , (*,0,-*) , (0,*,-*) , (-*,*,0) , (-*,0,-*) , (0,-*,-*)
            return [1,3,6,7,9,10,12,13,15,17,18,20];

          } else { // *x != *y
            return allIsos;
          }
        }
      } else {
        if (this.axesLength[2] > 1) { // ------------------------- [ * , 0 , * ]
          if (this.axesLength[0] == this.axesLength[2]) { // *x == *z
            // Todo

          } else { // *x != *z
            return allIsos;
          }

        } else { // ---------------------------------------------- [ * , 0 , 0 ]
          // (*,0,0) , (0,*,0) , (0,0,*) , (-*,0,0) , (0,-*,0) , (0,0,-*)
          return [1,2,5,6,8,9,15];
        }
      }
    } else {
      if (this.axesLength[1] > 1) {
        if (this.axesLength[2] > 1) { // ------------------------- [ 0 , * , * ]

        } else { // ---------------------------------------------- [ 0 , * , 0 ]
          // (0,*,0) , (*,0,0) , (0,0,*) , (-*,0,0) , (0,-*,0) , (0,0,-*)
          return [1,2,3,4,7,13];
        }

      } else {
        if (this.axesLength[2] > 1) { // ------------------------- [ 0 , 0 , * ]
          // (0,0,*) , (*,0,0) , (-*,0,0) , (0,*,0) , (0,-*,0) , (0,0,-*)
          return [1,3,5,6,8,14];
        }
      }
    }

  }

  getIsometry(isoCase) {

    let newPos = deepCopy(this.cubePositions);


    if (isoCase == 1) { // --------------------------------------- [ x , y , z ]
      return newPos;

    } else if (isoCase == 2) { // -------------------------------- [ y , x , z ]
      for (let i in newPos) {
        [newPos[i][0], newPos[i][1]] = [newPos[i][1], newPos[i][0]];
      }

    } else if (isoCase == 3) { // -------------------------------- [ z , x , y ]
      for (let i in newPos) {
        [newPos[i][0], newPos[i][1], newPos[i][2]] = [newPos[i][2], newPos[i][0], newPos[i][1]];
      }

    } else if (isoCase == 4) { // ------------------------------- [ -y , x , z ]
      for (let i in newPos) {
        [newPos[i][0], newPos[i][1]] = [-newPos[i][1], newPos[i][0]];
      }




    } else if (isoCase == 5) { // ------------------------------- [ -z , y , x ]
      for (let i in newPos) {
        [newPos[i][0], newPos[i][2]] = [-newPos[i][2], newPos[i][0]];
      }

    } else if (isoCase == 6) { // ------------------------------- [ -x , z , y ]
      for (let i in newPos) {
        [newPos[i][0], newPos[i][1], newPos[i][2]] = [-newPos[i][0], newPos[i][2], newPos[i][1]];
      }

    } else if (isoCase == 7) { // ------------------------------ [ -x , -y , z ]
      for (let i in newPos) {
        [newPos[i][0], newPos[i][1]] = [-newPos[i][0], -newPos[i][1]];
      }

    } else if (isoCase == 8) { // ------------------------------ [ -y , -z , x ]
      for (let i in newPos) {
        [newPos[i][0], newPos[i][1], newPos[i][2]] = [-newPos[i][1], -newPos[i][2], newPos[i][0]];
      }




    } else if (isoCase == 9) { // ------------------------------ [ -z , -x , y ]
      for (let i in newPos) {
        [newPos[i][0], newPos[i][1], newPos[i][2]] = [-newPos[i][2], -newPos[i][0], newPos[i][1]];
      }

    } else if (isoCase == 10) { // ------------------------------ [ y , -x , z ]
      for (let i in newPos) {
        [newPos[i][0], newPos[i][1]] = [newPos[i][1], -newPos[i][0]];
      }

    } else if (isoCase == 11) { // ------------------------------ [ z , -y , x ]
      for (let i in newPos) {
        [newPos[i][0], newPos[i][1], newPos[i][2]] = [newPos[i][2], -newPos[i][1], newPos[i][0]];
      }

    } else if (isoCase == 12) { // ----------------------------- [ x , -z , y ]
      for (let i in newPos) {
        [newPos[i][1], newPos[i][2]] = [-newPos[i][2], newPos[i][1]];
      }




    } else if (isoCase == 13) { // ------------------------------ [ x , z , -y ]
      for (let i in newPos) {
        [newPos[i][1], newPos[i][2]] = [newPos[i][2], -newPos[i][1]];
      }

    } else if (isoCase == 14) { // ------------------------------ [ y , x , -z ]
      for (let i in newPos) {
        [newPos[i][0], newPos[i][1], newPos[i][2]] = [newPos[i][1], newPos[i][0], -newPos[i][2]];
      }

    } else if (isoCase == 15) { // ------------------------------ [ z , y , -x ]
      for (let i in newPos) {
        [newPos[i][0], newPos[i][1], newPos[i][2]] = [newPos[i][2], -newPos[i][1], -newPos[i][0]];
      }

    } else if (isoCase == 16) { // ----------------------------- [ -z , x , -y ]
      for (let i in newPos) {
        [newPos[i][0], newPos[i][1], newPos[i][2]] = [-newPos[i][2], newPos[i][0], -newPos[i][1]];
      }




    } else if (isoCase == 17) { // ----------------------------- [ -x , y , -z ]
      for (let i in newPos) {
        [newPos[i][0], newPos[i][2]] = [-newPos[i][0], -newPos[i][2]];
      }

    } else if (isoCase == 18) { // ----------------------------- [ -y , z , -x ]
      for (let i in newPos) {
        [newPos[i][0], newPos[i][1], newPos[i][2]] = [-newPos[i][1], newPos[i][2], -newPos[i][0]];
      }

    } else if (isoCase == 19) { // ---------------------------- [ -x , -z , -y ]
      for (let i in newPos) {
        [newPos[i][0], newPos[i][1], newPos[i][2]] = [-newPos[i][0], -newPos[i][2], -newPos[i][1]];
      }

    } else if (isoCase == 20) { // --------------------------- [ -z , -x , -y  ]
      for (let i in newPos) {
        [newPos[i][0], newPos[i][1], newPos[i][2]] = [-newPos[i][2], -newPos[i][0], -newPos[i][1]];
      }




    } else if (isoCase == 21) { // ---------------------------- [ -y , -x , -z ]
      for (let i in newPos) {
        [newPos[i][0], newPos[i][1], newPos[i][2]] = [-newPos[i][1], -newPos[i][0], -newPos[i][2]];
      }

    } else if (isoCase == 22) { // ----------------------------- [ z , -x , -y ]
      for (let i in newPos) {
        [newPos[i][0], newPos[i][1], newPos[i][2]] = [newPos[i][2], -newPos[i][0], -newPos[i][1]];
      }

    } else if (isoCase == 23) { // ----------------------------- [ y , -z , -x ]
      for (let i in newPos) {
        [newPos[i][0], newPos[i][1], newPos[i][2]] = [newPos[i][1], -newPos[i][2], -newPos[i][0]];
      }

    } else if (isoCase == 24) { // ----------------------------- [ x , -y , -z ]
      for (let i in newPos) {
        [newPos[i][1], newPos[i][2]] = [-newPos[i][1], -newPos[i][2]];
      }

    } else {
      throw new Error('Not a valid Isometry choice value.');
    }
    return newPos; // add isonumber if needed
  }
}

let deepCopy = function(arr) {
  return JSON.parse(JSON.stringify(arr));
};

let axisLength = function(arr) {
  let uniqueX = [];
  let uniqueY = [];
  let uniqueZ = [];

  for (let i = 0; i < arr.length; i++) {
    uniqueX.push(arr[i][0]);
    uniqueY.push(arr[i][1]);
    uniqueZ.push(arr[i][2]);
  }
  uniqueX = [...new Set(uniqueX)];
  uniqueY = [...new Set(uniqueY)];
  uniqueZ = [...new Set(uniqueZ)];
  return [uniqueX.length, uniqueY.length, uniqueZ.length];
}
