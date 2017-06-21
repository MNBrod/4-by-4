var solver = require('./clean.js');

var hint3 = [0,0,3,0,0,4,0,0,0,0,0,0,2,0,0,0]
var ans3 = [
  [3,2,1,4],
  [4,3,2,1],
  [2,1,4,3],
  [1,4,3,2]
];

solver(hint3);
