var solver = require('./clean.js');
var chalk = require('chalk');

var hint3 = [0, 0, 3, 0, 0, 4, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0]
var hintFake = [0, 0, 3, 0, 1, 4, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0]
var hintFake2 = [0, 0, 3, 0, 1, 4, 0, 0, 0, 0, 1, 0, 2, 0, 0, 0]
var hintAll = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
var ans3 = [
  [3, 2, 1, 4],
  [4, 3, 2, 1],
  [2, 1, 4, 3],
  [1, 4, 3, 2]
];
//solver(hint3);
var makeLinesHor = [
  [1, 2, 3, 4],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
];
var makeLinesVert = [
  [1, 0, 0, 0],
  [2, 0, 0, 0],
  [3, 0, 0, 0],
  [4, 0, 0, 0]
]
var validateRowsBoard = [
  [3, 2, 1, 4],
  [4, 3, 2, 1],
  [2, 1, 4, 3],
  [1, 4, 3, 2]
];


/**
 *     0 1 2 3
 *     _ _ _ _
 * 15 |_|_|_|_| 4
 * 14 |_|_|_|_| 5
 * 13 |_|_|_|_| 6
 * 12 |_|_|_|_| 7
 *    11   9
 *       10  8
 */
var tests = true;
if (tests) {
  console.log("\nTESTS:\n");
  console.log(chalk.green("\nMake Line tests:"));
  console.log(solver.makeLine(makeLinesHor, 4).toString() === '4,3,2,1');
  console.log(solver.makeLine(makeLinesVert, 11).toString() === '4,3,2,1');
  console.log(solver.makeLine(makeLinesHor, 15).toString() === '1,2,3,4');
  console.log(solver.makeLine(makeLinesVert, 0).toString() === '1,2,3,4');

  console.log(chalk.green("\nValidate Count:"));
  console.log(solver.validateRows(validateRowsBoard));
  console.log(solver.validateRows(solver.rotate(validateRowsBoard)));

  console.log(chalk.green("\nValidate Hints:"));
  console.log(solver.validateHints(ans3, hint3));
  console.log(!solver.validateHints(ans3, hintFake2));
  console.log(solver.validateHints(ans3, hintAll));
  console.log(!solver.validateHints(ans3, hintFake));
  console.log(!solver.validateHints(makeLinesHor, hint3));


  console.log(chalk.green("\nVal:"));
  console.log(solver.val(ans3, hint3));

}
// console.log(solver.rotate(validateRowsBoard).join('\n'));

// solver.solver(hint3);


  // console.log(solver.validateHints([1, 2, 3, 4], 4));
  // console.log(solver.validateHints([2, 1, 3, 4], 3));
  // console.log(solver.validateHints([3, 2, 1, 4], 2));
  // console.log(solver.validateHints([4, 3, 2, 1], 1));
  // console.log(solver.validateHints([2, 1, 4, 3], 2));
  // console.log(solver.validateHints([1, 4, 3, 2], 2));
  // console.log(solver.validateHints([4, 1, 3, 2], 2));
  // //false ones
  // console.log(!solver.validateHints([1, 4, 3, 2], 3));
  // console.log(!solver.validateHints([1, 4, 3, 2], 3));
  // console.log(!solver.validateHints([3, 4, 1, 2], 1));
  // console.log(!solver.validateHints([1, 2, 4, 3], 2));
