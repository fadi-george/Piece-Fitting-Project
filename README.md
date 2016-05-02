# Piece Fitting Project (Babel and Node)
Given some empty cube, determine best possible arrangement of pieces so they can fit into the cube.

Project was created using Babeljs and Node. Project files utilize ES6 features.
Can be transpiled Google's transpiler traceur.

# (NOT FINISHED YET)

### Input Format
First line of input file should be the dimension of the empty cube.
Second line should be the number of pieces to fit into the cube.
Next lines have the form:
- Number (to denote a piece)
- Number (how many cubes is the piece comprised of)
- Number <Space> Number <Space> Number (x,y,z coordinate for the center of each cube)

### Solver
Solver comprises of breadth-first-search where it will stop once all the pieces have been fitted and not overlapping.
Project can be ran as such:

```
traceur src/index.js
```
