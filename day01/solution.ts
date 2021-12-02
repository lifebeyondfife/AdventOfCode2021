import { readFile } from 'fs';
import { StringDecoder } from 'string_decoder'
import * as _ from 'lodash';

const decoder = new StringDecoder('utf-8');

function calculateDepth(input: number[], diff: number) : number {
    return _
        .zip(input, _.drop(input, diff))
        .filter(([d1, d2]) => d2 > d1)
        .length;
}

readFile("./input.txt", (err, data) => {
    const input = decoder
        .write(data)
        .split('\n')
        .filter(x => x !== "")
        .map(x => parseInt(x))
    
    const answer1 = calculateDepth(input, 1);
    const answer2 = calculateDepth(input, 3);

    console.log(`Solution to part1: ${answer1}`);
    console.log(`Solution to part2: ${answer2}`);
})