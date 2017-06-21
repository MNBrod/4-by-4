
var combos = {};
var rowPosibs = {
    0: [],
    1: [],
    2: [],
    3: []
};
// var hints1ans = [
//     [2, 1, 4, 3],
//     [3, 4, 1, 2],
//     [4, 2, 3, 1],
//     [1, 3, 2, 4]
// ]
// var hints2ans = [
//     [1, 3, 4, 2],
//     [4, 2, 1, 3],
//     [3, 4, 2, 1],
//     [2, 1, 3, 4]
// ];
// var hints2ansW = [
//     [1, 2, 3, 4],
//     [1, 2, 3, 4],
//     [1, 2, 3, 4],
//     [1, 2, 3, 4]

// ];
var hintArrs = {
    top: [],
    right: [],
    bottom: [],
    left: []
}
var hints1 = [0, 0, 1, 2, 0, 2, 0, 0, 0, 3, 0, 0, 0, 1, 0, 0];
var hints2 = [2, 2, 1, 3, 2, 2, 3, 1, 1, 2, 2, 3, 3, 2, 1, 3]
var test = '1234';


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

var visible = function (str) {
    var arr = str.split('');
    var highest = 0;
    var Lviews = 0;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] > highest) {
            highest = arr[i];
            Lviews++;
        }
    }
    highest = 0;
    var Rviews = 0;
    for (var i = arr.length - 1; i > -1; i--) {
        if (arr[i] > highest) {
            highest = arr[i];
            Rviews++;
        }
    }
    return [Lviews, Rviews];

}

var fillCombos = function (arr) {
    for (var i = 0; i < arr.length; i++) {
        var views = visible(arr[i]);
        combos[arr[i]] = { lookingRight: views[0], lookingLeft: views[1] };
    }
    //console.log(combos);
}

var reduceWithHint = function (hintArrs, combos) {
    const keys = Object.keys(rowPosibs);
    const cKeys = Object.keys(combos);
    for (let i = 0; i < keys.length; i++) {
        //console.log("Looking at row " + i);
        var posibs = [];
        //go through each row
        var rHint = hintArrs.right[i];
        var lHint = hintArrs.left[i];
        //console.log("Right hint is ", rHint, ", Left hint is ", lHint);
        for (let c = 0; c < cKeys.length; c++) {
            if ((combos[cKeys[c]].lookingLeft === lHint || combos[cKeys[c]].lookingRight === rHint) || (lHint === 0 && rHint === 0)) {
                posibs.push(cKeys[c]);
            }
        }
        rowPosibs[i] = posibs;
    }
    //console.log("\n\n");
    for (let i = 0; i < 4; i++) {
        //console.log("For row ", i, ", there are ", rowPosibs[i].length, " possibilites");
    }
}
var splitHints = function (arr) {
    hintArrs.top = arr.splice(0, 4);
    hintArrs.right = arr.splice(0, 4);
    hintArrs.bottom = reverseArr(arr.splice(0, 4));
    hintArrs.left = reverseArr(arr.splice(0, 4));
    //console.log("\n", hintArrs);
}
var reverseArr = function (arr) {
    var temp = arr.slice();
    var result = [];
    for (var i = arr.length - 1; i > -1; i--) {
        result.push(arr[i]);
    }
    return result;
}

var validateBoard = function (arr) {
    console.log(arr.join("\n"));
    arr = rotate(arr, 4);
    // arr = rotate(arr, 4);
    // arr = rotate(arr, 4);
    console.log("\n");
    console.log(arr.join("\n"));

    for (var i = 0; i < 4; i++) { //iterate through the 'rows'
        var lHint = hintArrs.bottom[i];
        var rHint = hintArrs.top[i];
        if (arr[i].sort() !== [1, 2, 3, 4]) return false;
        for (let c = 0; c < arr[i].length; c++) {
            var Lview = visible(arr[i].toString())[0]
            var Rview = visible(arr[i].toString())[1]
            if (!((rHint === Rview) || rHint === 0) && !((lHint === Lview) || lHint === 0)) {
                return false;
            }
        }
    }
    return true;
    //convert the rows into coloumns
    //validate each coloumn
    //if theyre all valid, then they're done
}

var validate = function (board) {
    var colViews = [];
    //console.log(board.join('\n'));
    //console.log("\n");
    board = rotate(board);
    //console.log(board.join('\n'));
    var cols = [
        board[0],
        board[1],
        board[2],
        board[3]
    ];
    for (var i = 0; i < cols.length; i++) {
        var dup = cols[i].slice();
        if (dup.sort().toString() !== '1,2,3,4') return false;
        colViews = visible(cols[i].toString());
        // console.log(cols[i],i, "|||||", colViews);
        // console.log("\n");
        // console.log(hintArrs.bottom[i], hintArrs.top[i]);
        if (!isCompatible(colViews, [hintArrs.bottom[i], hintArrs.top[i]])) return false;
    }
    return true;
}
var isCompatible = function (views, hints) {
    if (hints[0] === 0 && hints[1] === 0) return true;
    if ((views[0] !== hints[0]) && hints[0] === 0) {
        return false;
    }
    if ((views[1] !== hints[1]) && hints[0] === 0) {
        return false;
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

var val = function (board, hints) {
    if (!validateHints(board, hints)) return false;
    board = rotate(board);
    console.log(board);
    for (var i = 0; i < board.length; i++) {
        //console.log("called", board[i]);
        if (board[i].sort().toString() !== '1,2,3,4') return false;
    }
    return true;
}

var permutations = permut['1234'];

var bruteForce = function () {
    var i = 0;
    // for (var a = 0; a < rowPosibs[0].length; a++) {
    //     for (var b = 0; b < rowPosibs[1].length; b++) {
    //         for (var c = 0; c < rowPosibs[2].length; c++) {
    //             for (var d = 0; d < rowPosibs[3].length; d++) {
    //                 console.log(i++);
    //                 var iteration = [
    //                     rowPosibs[0][a].split(''),
    //                     rowPosibs[1][b].split(''),
    //                     rowPosibs[2][c].split(''),
    //                     rowPosibs[3][d].split(''),
    //                 ]
    //                 if (validate(iteration)) return iteration;
    //             }
    //         }
    //     }
    // }
    for (var a = 0; a < permutations.length; a++) {
        for (var b = 0; b < permutations.length; b++) {
            for (var c = 0; c < permutations.length; c++) {
                for (var d = 0; d < permutations.length; d++) {
                    console.log(i++);
                    var iteration = [
                        permutations[a].split(''),
                        permutations[b].split(''),
                        permutations[c].split(''),
                        permutations[d].split(''),
                    ]
                    if (validateBoard(iteration)) {
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
    permutations = permut('1234');
    splitHints(clues)
    fillCombos(permut('1234'));
    reduceWithHint(hintArrs, combos);
    //var ans = bruteForce();
    console.log(combos);
    // rotate(ans);
    // rotate(ans);
    // rotate(ans);
    //return ans;
    //console.log("finished: ", bruteForce());
}

var validateHints = function (board, clues) {
    //always left to right
    var line = [];
    for (var i = 0; i < clues.length; i++) {
        if (clues[i] != 0) {
            if (clues[i] < 4) {
                line = [board[0][i], board[1][i], board[2][i], board[3][i]]
            } else if (clues[i] < 8) {
                line = [board[i][3], board[i][2], board[i][1], board[i][0]];
            } else if (clues[i] < 12) {
                var num = 11 - i;
                line = [board[3][num], board[2][num], board[1][num], board[0][num]]
            } else {
                line = [board[i][0], board[i][1], board[i][2], board[i][3]];
            }
            var highest = 0;
            var views = 0;
            for (var i = 0; i < line.length; i++) {
                if (line[i] > highest) {
                    highest = line[i];
                    views++;
                }
            }
            if (views != clues[i]) return false;
        }
    }
    return true;
}

module.exports = solver;
