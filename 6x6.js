const size = 6;
const rotate = require('./utils.js').rotate;
const permut = require('./utils.js').permut;
const rowPosibs = require('./ideas.js');

//192,937,500,000 possibilities instead of:
//139,314,070,000,000,000

//idea for moving forward:
/**
 * store an object that actually stores all the easily checked things:
 * eg:
 *  for a row '123456'
 *  we dont need to test any row that has a 1 is position 0, 2 in 1, 3, in 2, etc.
 * essentially, this creates only valid boards. that would cut down on both:
 *  A. number of boards being tested
 * and
 *  B. amount of time per test
 *
 * what are the benefits to both of these methods?
 * by generating the posible boards before, we can drastically shorten the testing
 * process
 * by doing as we go, we lengthen testing, but we dont have to calc all the board
 * ahead of time. ie, what happens if the solution was in the first 25%? we just
 * calced all 100%
 *
 *
 */

function validateRows(board) {
  for (let i = 0; i < board[0].length; i++) {
    var temp = board[i].slice();
    if (temp.sort().toString() != '1,2,3,4,5,6') {
      return false;
    }
  }
  return true;
}

var validateHints = function (board, clues) {
  for (let i = 0; i < clues.length; i++) {
    if (clues[i] !== 0) {
      let line = makeLine(board, i)
      //console.log(line, clues[i], "        (", i, ")");
      if (!validateLine(line, clues[i])) {
        //console.log(" ^ is false");
        return false;
      }
    }
  }
  //console.log("^ is true");
  return true;
}

var val = function (board, hints) {
  if (!validateRows(board)) return false;
  //console.log("Passed rows counting");
  var rotated = rotate(board);
  if (!validateRows(rotated)) return false;
  //console.log("Passed cols counting");
  rotated = rotate(board);
  rotated = rotate(board);
  rotated = rotate(board);
  if (!validateHints(board, hints)) return false;
  //console.log("Passed hint validation");
  return true;
}
var bruteForce = function (permutations, hints) {
  for (let a = 0; a < rowPosibs.rowPosibs[0].length; a++) {
    for (let b = 0; b < rowPosibs.rowPosibs[1].length; b++) {
      for (let c = 0; c < rowPosibs.rowPosibs[2].length; c++) {
        for (let d = 0; d < rowPosibs.rowPosibs[3].length; d++) {
          for (let e = 0; e < rowPosibs.rowPosibs[4].length; e++) {
            for (let f = 0; f < rowPosibs.rowPosibs[5].length; f++) {
              let iteration = [
                rowPosibs.rowPosibs[0][a].split(''),
                rowPosibs.rowPosibs[1][b].split(''),
                rowPosibs.rowPosibs[2][c].split(''),
                rowPosibs.rowPosibs[3][d].split(''),
                rowPosibs.rowPosibs[4][e].split(''),
                rowPosibs.rowPosibs[5][f].split(''),
              ];
              if (val(iteration, hints)) {
                console.log(iteration.join('\n'));
                return iteration;
              }
            }
          }
        }
      }
    }
  }
  console.log("well then");
};

var solver = function (clues) {
  var permutations = permut('123456');
  var ans = bruteForce(permutations, clues);
  console.log("finished: \n", ans);
  for (var i = 0; i < size; i++) {
    for (var c = 0; c < size; c++) {
      ans[i][c] = +ans[i][c];
    }
  }
  return ans;
}
/**
 * Assumes:
 *      line is left to right
 *      hint is from the left
 *      the correct hint is given for the correct line
 *
 * @param {array} line
 * @param {number} hint
 * @returns whether the line, read left to right, matches the hint given
 */
function validateLine(line, hint) {
  let views = 0;
  for (let i = 0, highest = 0; i < line.length; i++) {
    if (line[i] > highest) {
      highest = line[i];
      views++;
    }
  }
  if (views === hint) return true;
  return false;
}

/**
 * @param {2D array} board
 * @param {number} i
 * @returns a line starting at the hint, moving away from it
 *     0 1 2 3
 *     _ _ _ _
 * 15 |_|_|_|_| 4
 * 14 |_|_|_|_| 5
 * 13 |_|_|_|_| 6
 * 12 |_|_|_|_| 7
 *    11   9
 *       10  8
 *
 */
function makeLine6(board, i) {
  var line = [];
  var num = 0;
  if (i < 6) {
    //console.log("1");
    line = [board[0][i], board[1][i], board[2][i], board[3][i], board[4][i], board[5][i]]
  } else if (i < 12) {
    //console.log("2");
    num = i - 6;
    line = [board[num][5], board[num][4], board[num][3], board[num][2], board[num][1], board[num][0]];
  } else if (i < 18) {
    // console.log("3");
    num = 17 - i;
    line = [board[5][num], board[4][num], board[3][num], board[2][num], board[1][num], board[0][num]]
  } else {
    // console.log("4");
    num = 23 - i;
    line = [board[num][0], board[num][1], board[num][2], board[num][3], board[num][4], board[num][5]];
  }
  return line;
}
var solvePuzzle = function (clues) {
  var permutations = permut('123456');
  var ans = bruteForce(permutations, clues);
  console.log("finished: \n", ans);
  for (var i = 0; i < size; i++) {
    for (var c = 0; c < size; c++) {
      ans[i][c] = +ans[i][c];
    }
  }
  return ans;
}

// solvePuzzle([3, 2, 2, 3, 2, 1,
//   1, 2, 3, 3, 2, 2,
//   5, 1, 2, 2, 4, 3,
//   3, 2, 1, 2, 2, 4]);
console.log(rowPosibs);
/*
module.exports = {
  solver: solver,
  makeLine: makeLine4,
  makeLine6: makeLine6,
  validateRows: validateRows,
  validateHints: validateHints,
  validateLine: validateLine,
  permut: permut,
  rotate: rotate,
  val: val

}
*/
