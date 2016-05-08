export class PieceBlock {

  constructor(cubePositions, pieceID) {
    this.cubePositions = cubePositions; // -------------- Positions of Each Cube
    this.numCubes = cubePositions.length; // ------- Number of Cubes Composed of
    this.pieceID = pieceID; // --------------------------------- Label for Piece
    this.axesLength = axisLength(cubePositions); // Number of Cubes on Each Axis
  }

  getUniqueIsometries() {
    let allIsos = [...Array(24).keys()].map(x => ++x); // ------ [1,2,3,...,24]

    if (this.numCubes == 1) { // ----------------------------------- Single Cube
      return [1];
    }

    if (this.axesLength[0] > 1) {
      if (this.axesLength[1] > 1) {
        if (this.axesLength[2] > 1) { // ------------------------- [ * , * , * ]

          if (this.axesLength[0] == this.axesLength[1]) { // *x == *y
            if (this.axesLength[1] == this.axesLength[2]) { // *y == *z
              // (*,*,*) , (-*,*,*) , (-*,-*,*) , (*,-*,*) , (*,-*,-*) , (*,*,-*) , (-*,*,-*) , (-*,-*,-*)
              if (this.axesLength[0] & 1) {

              }
              return [1, 4, 7, 10, 11, 13, 16, 19];

            } else {
              return [1,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];

            }

          } else { // *x != *y
            if (this.axesLength[1] == this.axesLength[2]) { // *x != *y but *y == *z
              // Todo
              return allIsos;

            } else { // ----------------------- *x != *y , *x != *z  , *y != *z
              return allIsos;
            }
          }

        } else { // ---------------------------------------------- [ * , * , 0 ]
          if (this.axesLength[0] == this.axesLength[1]) { // *x == *y
            // (*,*,0) , (0,*,*) , (-*,0,*) , (-*,-*,0) , (0,-*,*) , (*,-*,0) , (*,0,*) , (*,0,-*) , (0,*,-*) , (-*,*,0) , (-*,0,-*) , (0,-*,-*)
            return [1, 3, 6, 7, 9, 10, 12, 13, 15, 17, 18, 20];

          } else { // *x != *y
            return allIsos;
          }
        }
      } else {
        if (this.axesLength[2] > 1) { // ------------------------- [ * , 0 , * ]
          if (this.axesLength[0] == this.axesLength[2]) { // *x == *z
            // (*,0,*) , (0,*,*) , (*,*,0) , (-*,0,*) , (-*,*,0) , (0,-*,*) , (-*,-*,0) , (*,-*,0) , (0,*,-*) , (*,0,-*) , (-*,0,-*) , (0,-*,-*)
            return [1, 2, 3, 5, 6, 8, 9, 12, 14, 15, 17, 21];

          } else { // *x != *z
            return [1,2,3,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,21,22,24];
          }

        } else { // ---------------------------------------------- [ * , 0 , 0 ]
          // (*,0,0) , (0,*,0) , (0,0,*) , (-*,0,0) , (0,-*,0) , (0,0,-*)
          return [1, 2, 5];
        }
      }
    } else {
      if (this.axesLength[1] > 1) {
        if (this.axesLength[2] > 1) { // ------------------------- [ 0 , * , * ]
          if (this.axesLength[1] == this.axesLength[2]) { // *x == *z
            // (0,*,*) , (*,0,*) , (-*,0,*) , (-*,*,0) , (0,-*,*) , (-*,-*,0) , (*,-*,0) , (0,*,-*) , (*,0,-*) , (*,*,0) (-*,0,-*) , (0,-*,-*)
            return [1, 2, 4, 5, 7, 8, 11, 13, 14, 15, 16, 19];

          } else { // *x != *z
            return allIsos;
          }

        } else { // ---------------------------------------------- [ 0 , * , 0 ]
          // (0,*,0) , (*,0,0) , (0,0,*) , (-*,0,0) , (0,-*,0) , (0,0,-*)
          return [1, 2, 3];
        }

      } else {
        if (this.axesLength[2] > 1) { // ------------------------- [ 0 , 0 , * ]
          // (0,0,*) , (*,0,0) , (-*,0,0) , (0,*,0) , (0,-*,0) , (0,0,-*)
          return [1, 3, 6];
        }
      }
    }

  }

  performIsometry(isoCase) {

    let newPos = this.cubePositions;

    if (isoCase == 1) { // --------------------------------------- [ x , y , z ]
      return newPos.map(([x, y, z]) => [x, y, z]);

    } else if (isoCase == 2) { // -------------------------------- [ y , z , x ]
      return newPos.map(([x, y, z]) => [y, z, x]); // switch order for array elements

    } else if (isoCase == 3) { // -------------------------------- [ z , x , y ]
      return newPos.map(([x, y, z]) => [z, x, y]);

    } else if (isoCase == 4) { // ------------------------------- [ -y , x , z ]
      return newPos.map(([x, y, z]) => [-y, x, z]);

    } else if (isoCase == 5) { // ------------------------------- [ -z , y , x ]
      return newPos.map(([x, y, z]) => [-z, y, x]);

    } else if (isoCase == 6) { // ------------------------------- [ -x , z , y ]
      return newPos.map(([x, y, z]) => [-x, z, y]);

    } else if (isoCase == 7) { // ------------------------------ [ -x , -y , z ]
      return newPos.map(([x, y, z]) => [-x, z, y]);

    } else if (isoCase == 8) { // ------------------------------ [ -y , -z , x ]
      return newPos.map(([x, y, z]) => [-y, -z, x]);

    } else if (isoCase == 9) { // ------------------------------ [ -z , -x , y ]
      return newPos.map(([x, y, z]) => [-z, -x, y]);

    } else if (isoCase == 10) { // ------------------------------ [ y , -x , z ]
      return newPos.map(([x, y, z]) => [y, -x, z]);

    } else if (isoCase == 11) { // ------------------------------ [ z , -y , x ]
      return newPos.map(([x, y, z]) => [z, -y, x]);

    } else if (isoCase == 12) { // ----------------------------- [ x , -z , y ]
      return newPos.map(([x, y, z]) => [x, -z, y]);

    } else if (isoCase == 13) { // ------------------------------ [ x , z , -y ]
      return newPos.map(([x, y, z]) => [x, z, -y]);

    } else if (isoCase == 14) { // ------------------------------ [ y , x , -z ]
      return newPos.map(([x, y, z]) => [y, x, -z]);

    } else if (isoCase == 15) { // ------------------------------ [ z , y , -x ]
      return newPos.map(([x, y, z]) => [z, y, -x]);

    } else if (isoCase == 16) { // ----------------------------- [ -z , x , -y ]
      return newPos.map(([x, y, z]) => [-z, x, -y]);

    } else if (isoCase == 17) { // ----------------------------- [ -x , y , -z ]
      return newPos.map(([x, y, z]) => [-x, y, -z]);

    } else if (isoCase == 18) { // ----------------------------- [ -y , z , -x ]
      return newPos.map(([x, y, z]) => [-y, z, -x]);

    } else if (isoCase == 19) { // ---------------------------- [ -x , -z , -y ]
      return newPos.map(([x, y, z]) => [-x, -z, -y]);

    } else if (isoCase == 20) { // --------------------------- [ -z , -x , -y  ]
      return newPos.map(([x, y, z]) => [-x, -z, -y]);

    } else if (isoCase == 21) { // ---------------------------- [ -y , -x , -z ]
      return newPos.map(([x, y, z]) => [-y, -x, -z]);

    } else if (isoCase == 22) { // ----------------------------- [ z , -x , -y ]
      return newPos.map(([x, y, z]) => [z, -x, -y]);

    } else if (isoCase == 23) { // ----------------------------- [ y , -z , -x ]
      return newPos.map(([x, y, z]) => [y, -z, -x]);

    } else if (isoCase == 24) { // ----------------------------- [ x , -y , -z ]
      return newPos.map(([x, y, z]) => [x, -y, -z]);

    } else {
      throw new Error('Not a valid Isometry choice value.');
    }
  }
}

// Deep copies an array so modifications on new array doesnt transfer to old array
export function deepCopy(arr) {
  return JSON.parse(JSON.stringify(arr));
};

// count how far cubes extend per axis
export function axisLength(arr) {
  let xs = arr.map(e => e[0]); // grab each x-coordinate
  let ys = arr.map(e => e[1]);
  let zs = arr.map(e => e[2]);
  let uniqueX = [...new Set(xs)]; // grab unique x-coordinates
  let uniqueY = [...new Set(ys)];
  let uniqueZ = [...new Set(zs)];

  // count unique coordinates
  return [uniqueX.length, uniqueY.length, uniqueZ.length];
}

export function axisMinMax(arr) { // [ [x,y,z] , [x,y,z] , ... ]
  let x = arr.map(e => e[0]); // grab each x-coordinate inside the array
  let y = arr.map(e => e[1]); // grab each y-coordinate inside the array
  let z = arr.map(e => e[2]); // grab each z-coordinate inside the array

  // boundaries for each coordinate (bounding box)
  return [[Math.min(...x),Math.max(...x)],[Math.min(...y),Math.max(...y)],[Math.min(...z),Math.max(...z)]];
}
