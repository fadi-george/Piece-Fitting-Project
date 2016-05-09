export class PieceBlock {

  constructor(cubePositions, pieceID) {
    this.cubePositions = cubePositions; // -------------- Positions of Each Cube
    this.numCubes = cubePositions.length; // ------- Number of Cubes Composed of
    this.pieceID = pieceID; // --------------------------------- Label for Piece
    this.axesLength = axisLength(cubePositions); // Number of Cubes on Each Axis
    this.uniqueIsoCases = [];
    this.uniqueIsos = this.getUniqueIsometries();
  }

  getUniqueIsometries() {
    let uniqueIsos = [];
    let uniqArrStr;
    let isoStr;
    let uniqueConfig;
    let uniquePositions = [];
    let isoConfig;
    let lims;

    for (let i = 1; i <= 24; i++) { // ---------- Check if other isometries gives different configurations from the rest

      uniqueConfig = true;
      isoConfig = this.performIsometry(i); // ---- Check Each Isometries
      lims = axisMinMax(isoConfig); // ----------- Get Boundaries
      isoConfig = isoConfig.map( e => [e[0]-lims[0],e[1]-lims[2] ,e[2]-lims[4]] ); // ---- shift by most negative values in each axis
      isoConfig.sort();

      for (let arr of uniquePositions) { // keep track of unique configurations
        uniqArrStr = arr.toString();
        isoStr = isoConfig.toString();

        if( isoStr == uniqArrStr ){ // if isometries results in a previously seen configuration, dont update the list
          uniqueConfig = false;
        }
      }

      if( uniqueConfig ){
        uniqueIsos.push(i);
        uniquePositions.push(isoConfig);
      }
    }
    this.uniqueIsoCases = uniqueIsos;
    return uniquePositions;
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
      return newPos.map(([x, y, z]) => [-x, -y, z]);

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

    } else if (isoCase == 20) { // --------------------------- [ -z , -y , -x  ]
      return newPos.map(([x, y, z]) => [-z, -y, -x]);

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
  return [Math.min(...x), Math.max(...x), Math.min(...y), Math.max(...y), Math.min(...z), Math.max(...z)];
}
