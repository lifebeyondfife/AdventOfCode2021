import { readFile } from 'fs';
import { StringDecoder } from 'string_decoder'

const decoder = new StringDecoder('utf-8');

enum Direction {
    Up = "up",
    Down = "down",
    Forward = "forward"
}

class Operation {
    direction: Direction;
    distance: number;
    operations = {
        'part1': (pos: number, dep: number, aim: number): [number, number, number] => {
            switch (this.direction) {
                case Direction.Down: return [pos, dep + this.distance, 0];
                case Direction.Forward: return [pos + this.distance, dep, 0];
                case Direction.Up: return [pos, dep - this.distance, 0];
            }
        },
        'part2': (pos: number, dep: number, aim: number): [number, number, number] => {
            switch (this.direction) {
                case Direction.Down: return [pos, dep, aim + this.distance];
                case Direction.Forward: return [pos + this.distance, dep + aim * this.distance, aim];
                case Direction.Up: return [pos, dep, aim - this.distance];
            }
        }
    }

    constructor(dir: Direction, dis: number) {
        this.direction = dir;
        this.distance = dis;
    }

    apply(part: string, pos: number, dep: number, aim: number) {
        return this.operations[part](pos, dep, aim);
    }
}

class Submarine {
    position: number;
    depth: number;
    aim: number;

    constructor(p: number, d: number, a: number) {
        this.position = p;
        this.depth = d;
        this.aim = a;
    }

    apply(op: Operation, part: string) {
        [this.position, this.depth, this.aim] = op.apply(part, this.position, this.depth, this.aim);
    }
}

readFile("./input.txt", (err, data) => {
    const operations = decoder
        .write(data)
        .split('\n')
        .filter(x => x !== "")
        .map(x => x.split(" "))
        .map(([s, n]) => new Operation(s as Direction, parseInt(n)));

    ['part1', 'part2'].forEach(part => {
        const submarine = new Submarine(0, 0, 0);
        operations.forEach(o => {
            submarine.apply(o, part);
        })
        console.log(`Solution to ${part}: ${submarine.depth * submarine.position}`);
    })
})