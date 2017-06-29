const { reverseArray, permut, equals } = require('./utils')
Array.prototype.equals = equals;
var hints = [3, 2, 2, 3, 2, 1,
  1, 2, 3, 3, 2, 2,
  5, 1, 2, 2, 4, 3,
  3, 2, 1, 2, 2, 4]
var rowPosibs = {
  0: [],
  1: [],
  2: [],
  3: [],
  4: [],
  5: []
};
function makeRowHintPairs(hint) {
  var result = [];
  var rightHints = hint.slice(6, 12);
  var leftHints = reverseArray(hint.slice(18));
  for (let i = 0; i < rightHints.length; i++) {
    let num = i;
    result.push([leftHints[i], rightHints[i]]);
  }
  return result;
}

function calcVisibilityRows(rows) {
  var result = [];
  for (var i = 0; i < rows.length; i++) {
    result.push({
      row: rows[i],
      visible: calcVisible(rows[i])
    })
  }
  return result;
}

function calcVisible(row) {
  var left, right;
  var line = row.split('');
  let views = 0;
  for (let i = 0, highest = 0; i < line.length; i++) {
    if (line[i] > highest) {
      highest = line[i];
      views++;
    }
  }
  left = views;
  views = 0;
  for (let i = line.length - 1, highest = 0; i > -1; i--) {
    if (line[i] > highest) {
      highest = line[i];
      views++;
    }
  }
  right = views;
  return [left, right];
}

function fillRowPosibilities(rowHintPairs, calcedRows) {
  var result = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: []
  };
  var j = 0;
  for (var i = 0; i < rowHintPairs.length; i++) {
    for (var c = 0; c < calcedRows.length; c++) {
      //overly simple, doesn't handle 0's at all
      //need to add more if statements
      if (rowHintPairs[i].equals(calcedRows[c].visible)) {
        j++;
        result[i].push(calcedRows[c].row);
      }
    }
  }
  //console.log(result, j);
  return result;
}
var rowPermutations = permut('123456');
var rowVisibility = calcVisibilityRows(rowPermutations);
var hintPairs = makeRowHintPairs(hints);
// console.log(hintPairs, rowVisibility);
fillRowPosibilities(hintPairs, rowVisibility);

  // var rightHints = hint.slice(6, 12);
  // var leftHints = hint.slice(18);
module.exports = {
  rowPosibs: fillRowPosibilities(hintPairs, rowVisibility)
}
// console.log(validateRow(permut('1234'), hints));
