//fill out an array with the opposite values (all rows add up too 5)
//fill out the tallest buildings (from 1s, 3s)
var answer;
var Board = function (brd) {
  this.board = brd || [];
  if (!brd) {
    for (var i = 0; i < 4; i++) {
      this.board.push([0, 0, 0, 0]);
    }
  }
}
Board.prototype.changeVal = function ([x, y], val) {
  this.board[x][y] = val;
}

var solver = function (partial) {
  if (isComplete(partial)) {
    return true;
  }
  else {
    for (var row = 0; row < 4; row++) {
      for (var col = 0; col < 4; col++) {
        if (partial[row][col] === 0) {
          for (var height = 1; height < 5; height++) {
            var tempHeight = partial[row][col];
            partial.changeVal([row, col], height);
            if (solver(partial)) {
              answer = partial;
              return true;
            } else {
              partial.changeVal([row, col], tempHeight);
              return false;
            }
          }
        }
      }
    }
  }
}
//make a function that fills in obvious pieces
console.log(answer);

var isComplete = function (board) {
  return true;
}

/*
var Board = function (dimension) {
  this.board = [];
  for (var i = 0; i < dimension; i++) {
    for (var c = 0; c < dimension; c++) {
      this.board.push()
    }
  }
}
// find a single solution (helper function)
boolean solve ( partial solution, subproblem ) {
 if the partial solution is complete,
 return true (it is a solution)
 else
 for each legal next choice
 add the choice to the partial solution
 generate new subproblem
 if solve(updated partial solution,
 new subproblem)
 return true (have a solution!)
 undo choice (restore partial solution)
 return false
}
*/
