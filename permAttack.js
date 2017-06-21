
function permut(string) {
    if (string.length < 2) return string; // This is our break condition

    var permutations = []; // This array will hold our permutations

    for (var i=0; i<string.length; i++) {
        var char = string[i];

        // Cause we don't want any duplicates:
        if (string.indexOf(char) != i) // if char was used already
            continue;           // skip it this time

        var remainingString = string.slice(0,i) + string.slice(i+1,string.length); //Note: you can concat Strings via '+' in JS

        for (var subPermutation of permut(remainingString))
            permutations.push(char + subPermutation)

    }
    return permutations;
}
var test = '1234';

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
    for (var i = arr.length-1; i > -1; i--) {
        if (arr[i] > highest) {
            highest = arr[i];
            Rviews++;
        }
    }
    return [Lviews, Rviews];

}
var combos = {};

var fillCombos = function (arr) {
    for (var i = 0; i < arr.length; i++) {
        var views = visible(arr[i]);
        combos[arr[i]] = {right: views[0], left: views[1]};
    }
console.log(combos);
}

var rowPosibs = {
    0: [],
    1: [],
    2: [],
    3: []
};

var reduceWithHint = function (hint, com) {
    var result = [];
    var keys = Object.keys(com);
    var vals = Object.values(com);
    for (var i = 0; i < key.length; i++) {
        if (vals[i].right === hint) {
            result.push(vals[i].right)
        }
    }
    return result;
}

// console.log(visible(test));
var arr = permut('1234');
fillCombos(arr);
