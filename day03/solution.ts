import { readFile } from 'fs';
import { StringDecoder } from 'string_decoder'

const decoder = new StringDecoder('utf-8');

function integersWithBitmask(integers: number[], index: number, mask: number) : number[] {
    return integers.filter(n => (n >> (11 - index) & 0b1) == mask)  
}

function mostLeastIntegers(integers: number[], criteria: (a: number, b: number) => boolean, index: number) : number[] {
    const bitSet = integersWithBitmask(integers, index, 0b1);
    const bitUnset = integersWithBitmask(integers, index, 0b0);

    return criteria(bitSet.length, bitUnset.length) ? bitSet : bitUnset;
}

function calcRate(integers: number[], criteria: (a: number, b: number) => boolean, index: number = 0) : number {
    if (integers.length == 1) {
        return integers.pop() as number;
    }
    return calcRate(mostLeastIntegers(integers, criteria, index), criteria, ++index);
}

function mostCommonBit(integers: number[], index: number) : boolean {
    return integersWithBitmask(integers, index, 0b1).length >= integers.length / 2;
}

function mostCommonBitNumber(integers: number[], index: number) : number {
    return mostCommonBit(integers, index) ? 0b1 << (11 - index) : 0;
}

function invert(integer: number) : number {
    return integer ^ 0b111111111111;
}

function calcGammaRate(integers: number[]) : number {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
        .map(idx => mostCommonBitNumber(integers, idx))
        .reduce((a, b) => a + b);
}

readFile("./input.txt", (err, data) => {
    const integers = decoder
        .write(data)
        .split('\n')
        .filter(x => x !== "")
        .map(x => parseInt(x, 2))

    const gammaRate = calcGammaRate(integers);
    const epsilonRate = invert(gammaRate);
    const oxygenRate = calcRate(integers, (a, b) => a >= b);
    const co2Rate = calcRate(integers, (a, b) => a < b);

    console.log(`Solution to part1: ${gammaRate * epsilonRate}`);
    console.log(`Solution to part2: ${oxygenRate * co2Rate}`);
})