"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var string_decoder_1 = require("string_decoder");
var _ = require("lodash");
var decoder = new string_decoder_1.StringDecoder('utf-8');
function part1(input, index) {
    return input[index];
}
function part2(input, index) {
    return (index < input.length - 2) ?
        input[index] + input[index + 1] + input[index + 2] :
        0;
}
function calculateDepth(input, method) {
    return _
        .zip(_.range(input.length), _.drop(_.range(input.length), 1))
        .map(function (_a) {
        var i1 = _a[0], i2 = _a[1];
        return [method(input, i1), method(input, i2)];
    })
        .filter(function (_a) {
        var d1 = _a[0], d2 = _a[1];
        return d2 > d1;
    })
        .length;
}
(0, fs_1.readFile)("./input.txt", function (err, data) {
    var input = decoder
        .write(data)
        .split('\n')
        .filter(function (x) { return x !== ""; })
        .map(function (x) { return parseInt(x); });
    var answer1 = calculateDepth(input, part1);
    var answer2 = calculateDepth(input, part2);
    console.log("Solution to part1: ".concat(answer1));
    console.log("Solution to part2: ".concat(answer2));
});
