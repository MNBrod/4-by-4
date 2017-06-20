/**
 * creates a new board, initializing it to a 4x4 array with all values set to 0
 */
var Board = function () {
  this.board = [];
  this.rowsComplete = {
    0: false,
    1: false,
    2: false,
    3: false
  }
  this.colComplete = {
    0: false,
    1: false,
    2: false,
    3: false
  }

  for (var i = 0; i < 4; i++) {
    this.board.push([0, 0, 0, 0]);
  }
}
/**
 * changes one value on this board, given an array of x and y coordinates,
 * and the value it should be set too
 * @param {array} the x and y coords
 * @param {number} the value the cell should be set at
 */
Board.prototype.changeVal = function ([x, y], val) {
  this.board[x][y] = val;
}
Board.prototype.print = function () {
  console.log(this.board.join('\n'));
}
/**
 * finds the solution to a puzzle given a partial solution and a set of hints
 * @param {Board} partial
 * @param {array} hints to check against
 */
var solver = function (partial, hints) {
  if (isComplete(partial, hints)) {
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
              return partial;
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

/**
 * returns true if the board is a solution given the hints and rules, and
 * false otherwise
 * @param {Board} board
 */
var isComplete = function (board) {
  return true;
}
/**
 * stores the coordinate that a hint is connected too
 */
var hintCoord = {
  0: [0, 0],
  1: [0, 1],
  2: [0, 2],
  3: [0, 3],
  4: [0, 3],
  5: [1, 3],
  6: [2, 3],
  7: [3, 3],
  8: [3, 3],
  9: [3, 2],
  10: [3, 1],
  11: [3, 0],
  12: [3, 0],
  13: [2, 0],
  14: [1, 0],
  15: [0, 0]
}
var hints = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
/**
 * takes hints, and fills in the ones and fours on the board with the proper
 * values.
 * @param {Board} board
 * @param {array} hints
 */
var fillObv = function (board, hints) {
  for (var i = 0; i < hints.length; i++) {
    if (hints[i] === 4) {
      var org = hintCoord[i];
      var x = org[0];
      var y = org[1];
      //fill in all 4 for coloumn
      if ((i > 0 && i < 4) || (i > 7 && i < 12)) { //i is a column
        if (i < 7) {//count up
          board.changeVal([x, y], 1);
          board.changeVal([x + 1, y], 2);
          board.changeVal([x + 2, y], 3);
          board.changeVal([x + 3, y], 4);
        } else {
          board.changeVal([x, y], 1);
          board.changeVal([x - 1, y], 2);
          board.changeVal([x - 2, y], 3);
          board.changeVal([x - 3, y], 4);
        }
      } else {
        var org = hintCoord[i];
        var x = org[0];
        var y = org[1];

        if (i < 11) { //count from right
          board.changeVal([x, y], 1);
          board.changeVal([x, y + 1], 2);
          board.changeVal([x, y + 2], 3);
          board.changeVal([x, y + 3], 4);
        } else {//count from left
          board.changeVal([x, y], 1);
          board.changeVal([x, y - 1], 2);
          board.changeVal([x, y - 2], 3);
          board.changeVal([x, y - 3], 4);
        }
      }
    } else if (hints[i] === 1) {
      board.changeVal(hintCoord[i], 4);
    }
  }
  return board;
}


var bard = new Board();
bard = fillObv(bard, hints);
bard.print();

