import { readFile } from 'fs';
import { StringDecoder } from 'string_decoder'
import * as _ from 'lodash';

const decoder = new StringDecoder('utf-8');

function part1(input: number[], index: number) : number {
    return input[index];
}

function part2(input: number[], index: number) : number {
    return (index < input.length - 2) ?
        input[index] + input[index + 1] + input[index + 2] :
        0;
}

function calculateDepth(input: number[], method: (input: number[], index: number) => number) {
    return _
        .zip(_.range(input.length), _.drop(_.range(input.length), 1))
        .map(([i1, i2] : [number, number]) => [method(input, i1), method(input, i2)])
        .filter(([d1, d2]) => d2 > d1)
        .length;
}

readFile("./input.txt", (err, data) => {
    const input = decoder
        .write(data)
        .split('\n')
        .filter(x => x !== "")
        .map(x => parseInt(x))
    
    const answer1 = calculateDepth(input, part1);
    const answer2 = calculateDepth(input, part2);

    console.log(`Solution to part1: ${answer1}`);
    console.log(`Solution to part2: ${answer2}`);
})