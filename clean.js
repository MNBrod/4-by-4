var val = function (board, hints) {
  if (!validateHints(board, hints)) {
    return false;
  }
    console.log("not called early at hints");
  board = rotate(board);
  console.log(board);
  for (var i = 0; i < board.length; i++) {
    //console.log("called", board[i]);
    if (board[i].sort().toString() !== '1,2,3,4') return false;
  }
  return true;
}
function rotate(matrix) {
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
  var line = [];
  var num;
  var done = false;
  for (var i = 0; i < clues.length; i++) {
    if (clues[i] !== 0) {
      if (i < 4) {
        console.log("1");
        line = [board[0][i], board[1][i], board[2][i], board[3][i]]
      } else if (i < 8) {
        console.log("2");
        num = i - 4;
        line = [board[num][3], board[num][2], board[num][1], board[num][0]];
      } else if (i < 12) {
        console.log("3");
        num = 11 - i;
        line = [board[3][num], board[2][num], board[1][num], board[0][num]]
      } else {
        console.log("4");
        num = 15 - i;
        line = [board[num][0], board[num][1], board[num][2], board[num][3]];
      }
      var highest = 0;
      var views = 0;
      for (var i = 0; i < line.length; i++) {
        if (line[i] > highest) {
          highest = line[i];
          views++;
        }
      }
      if (views !== clues[i])  done = true;
      line = [];
    }
  }
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
  for (var a = 0; a < length; a++) {
    for (var b = 0; b < length; b++) {
      for (var c = 0; c < length; c++) {
        for (var d = 0; d < length; d++) {
          //console.log(i++);
          var iteration = [
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
  //splitHints(clues)
  //fillCombos(permut('1234'));
  //reduceWithHint(hintArrs, combos);
  var ans = bruteForce(permutations, clues);
  //console.log(combos);
  //rotate(ans);
  //rotate(ans);
  //rotate(ans);
  console.log("finished: ", ans);
  //return ans;
}
module.exports = solver;
