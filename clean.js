function validateRows(board) {
  //console.log(board.join('\n'));
  for (let i = 0; i < board[0].length; i++) {
    var temp = board[i].slice();
    if (temp.sort().toString() != '1,2,3,4') {
      //console.log("--> false");
      return false;
    }
  }
  //console.log("--> true");
  return true;
}

function rotate(board) {
  var matrix = board.slice();
  //console.log(matrix.join('\n'));
  var n = matrix.length;
  for (var i = 0; i < n / 2; i++) {
    for (var j = 0; j < Math.ceil(n / 2); j++) {
      var temp = matrix[i][j];
      matrix[i][j] = matrix[n - 1 - j][i];
      matrix[n - 1 - j][i] = matrix[n - 1 - i][n - 1 - j];
      matrix[n - 1 - i][n - 1 - j] = matrix[j][n - 1 - i];
      matrix[j][n - 1 - i] = temp;
    }
  }
  return matrix;
}

var validateHints = function (board, clues) {
  for (let i = 0; i < clues.length; i++) {
    if (clues[i] !== 0) {
      let line = makeLine(board, i)
      console.log(line, clues[i], "        (", i, ")");
      if (!validateLine(line, clues[i])) {
        console.log(" ^ is false");
        return false;
      }
    }
  }
  console.log("^ is true");
  return true;
}

var val = function (board, hints) {
  if (!validateRows(board)) return false;
  console.log("Passed rows counting");
  var rotated = rotate(board);
  if (!validateRows(rotated)) return false;
  console.log("Passed cols counting");
  if (!validateHints(board, hints)) return false;
  console.log("Passed hint validation");
  return true;
}

function permut(string) {
  if (string.length < 2) return string; // This is our break condition
  var permutations = []; // This array will hold our permutations
  for (var i = 0; i < string.length; i++) {
    var char = string[i];
    // Cause we don't want any duplicates:
    if (string.indexOf(char) != i) // if char was used already
      continue;           // skip it this time
    var remainingString = string.slice(0, i) + string.slice(i + 1, string.length); //Note: you can concat Strings via '+' in JS
    for (var subPermutation of permut(remainingString))
      permutations.push(char + subPermutation)
  }
  return permutations;
}

var bruteForce = function (permutations, hints) {
  var i = 0;
  var length = permutations.length;
  for (let a = 0; a < length; a++) {
    for (let b = 0; b < length; b++) {
      for (let c = 0; c < length; c++) {
        for (let d = 0; d < length; d++) {
          //console.log(i++);
          let iteration = [
            permutations[a].split(''),
            permutations[b].split(''),
            permutations[c].split(''),
            permutations[d].split(''),
          ]
          if (val(iteration, hints)) {
            console.log(iteration.join('\n'));
            return iteration;
          }
        }
      }
    }
  }
  console.log("well then");
}
var solver = function (clues) {
  var permutations = permut('1234');
  var ans = bruteForce(permutations, clues);
  console.log("finished: ", ans);
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
function makeLine(board, i) {
  var line = [];
  var num = 0;
  if (i < 4) {
    //console.log("1");
    line = [board[0][i], board[1][i], board[2][i], board[3][i]]
  } else if (i < 8) {
    //console.log("2");
    num = i - 4;
    line = [board[num][3], board[num][2], board[num][1], board[num][0]];
  } else if (i < 12) {
    // console.log("3");
    num = 11 - i;
    line = [board[3][num], board[2][num], board[1][num], board[0][num]]
  } else {
    // console.log("4");
    num = 15 - i;
    line = [board[num][0], board[num][1], board[num][2], board[num][3]];
  }
  return line;
}
module.exports = {
  solver: solver,
  makeLine: makeLine,
  validateRows: validateRows,
  validateHints: validateHints,
  validateLine: validateLine,
  permut: permut,
  rotate: rotate,
  val: val

}
