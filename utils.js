function reverseArray(arr) {
  var result = [];
  for (var i = 0; i < arr.length; i++) {
    result.unshift(arr[i]);
  }
  return result;
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

function equals(arr) {
  if (this.length !== arr.length) return false;
  for (var i = 0; i < this.length; i++) {
    if (this[i] !== arr[i]) return false;
  }
  return true;
}

function rotate(board) {
  var matrix = board.slice();
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
module.exports = {
  reverseArray,
  permut,
  equals,
  rotate
};

