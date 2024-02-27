import * as ethers from 'ethers'
import {LogEvent, Func, ContractBase} from './abi.support'
import {ABI_JSON} from './ZKube.abi'

export const abi = new ethers.Interface(ABI_JSON);

export const functions = {
    BLOCKS_UNTIL_START: new Func<[], {}, bigint>(
        abi, '0x9ca99bb8'
    ),
    createGame: new Func<[puzzleSet: string, interval: number, numberOfTurns: number], {puzzleSet: string, interval: number, numberOfTurns: number}, bigint>(
        abi, '0x2efdae7b'
    ),
    gameId: new Func<[], {}, bigint>(
        abi, '0xd7c81b55'
    ),
    games: new Func<[_: bigint], {}, ([player1: ([address_: string, score: number, totalBlocks: bigint] & {address_: string, score: number, totalBlocks: bigint}), player2: ([address_: string, score: number, totalBlocks: bigint] & {address_: string, score: number, totalBlocks: bigint}), puzzleSet: string, interval: number, numberOfRounds: number, startingBlock: bigint, stake: bigint] & {player1: ([address_: string, score: number, totalBlocks: bigint] & {address_: string, score: number, totalBlocks: bigint}), player2: ([address_: string, score: number, totalBlocks: bigint] & {address_: string, score: number, totalBlocks: bigint}), puzzleSet: string, interval: number, numberOfRounds: number, startingBlock: bigint, stake: bigint})>(
        abi, '0x117a5b90'
    ),
    joinGame: new Func<[id: bigint], {id: bigint}, []>(
        abi, '0xefaa55a0'
    ),
    resolveGame: new Func<[id: bigint], {id: bigint}, []>(
        abi, '0xb7a5a5b6'
    ),
    roundSubmitted: new Func<[_: bigint, _: string, _: bigint], {}, boolean>(
        abi, '0x6468a924'
    ),
    selectPuzzle: new Func<[id: bigint], {id: bigint}, ([roundBlockNumber: bigint, game: ([player1: ([address_: string, score: number, totalBlocks: bigint] & {address_: string, score: number, totalBlocks: bigint}), player2: ([address_: string, score: number, totalBlocks: bigint] & {address_: string, score: number, totalBlocks: bigint}), puzzleSet: string, interval: number, numberOfRounds: number, startingBlock: bigint, stake: bigint] & {player1: ([address_: string, score: number, totalBlocks: bigint] & {address_: string, score: number, totalBlocks: bigint}), player2: ([address_: string, score: number, totalBlocks: bigint] & {address_: string, score: number, totalBlocks: bigint}), puzzleSet: string, interval: number, numberOfRounds: number, startingBlock: bigint, stake: bigint}), puzzle: ([startingGrid: string, finalGrid: string, availableFunctions: Array<number>] & {startingGrid: string, finalGrid: string, availableFunctions: Array<number>})] & {roundBlockNumber: bigint, game: ([player1: ([address_: string, score: number, totalBlocks: bigint] & {address_: string, score: number, totalBlocks: bigint}), player2: ([address_: string, score: number, totalBlocks: bigint] & {address_: string, score: number, totalBlocks: bigint}), puzzleSet: string, interval: number, numberOfRounds: number, startingBlock: bigint, stake: bigint] & {player1: ([address_: string, score: number, totalBlocks: bigint] & {address_: string, score: number, totalBlocks: bigint}), player2: ([address_: string, score: number, totalBlocks: bigint] & {address_: string, score: number, totalBlocks: bigint}), puzzleSet: string, interval: number, numberOfRounds: number, startingBlock: bigint, stake: bigint}), puzzle: ([startingGrid: string, finalGrid: string, availableFunctions: Array<number>] & {startingGrid: string, finalGrid: string, availableFunctions: Array<number>})})>(
        abi, '0x516dcdd9'
    ),
    submitPuzzle: new Func<[id: bigint, proof: ([a: Array<bigint>, b: Array<Array<bigint>>, c: Array<bigint>, input: Array<bigint>] & {a: Array<bigint>, b: Array<Array<bigint>>, c: Array<bigint>, input: Array<bigint>})], {id: bigint, proof: ([a: Array<bigint>, b: Array<Array<bigint>>, c: Array<bigint>, input: Array<bigint>] & {a: Array<bigint>, b: Array<Array<bigint>>, c: Array<bigint>, input: Array<bigint>})}, []>(
        abi, '0x230ecf3f'
    ),
    verifier: new Func<[], {}, string>(
        abi, '0x2b7ac3f3'
    ),
}

export class Contract extends ContractBase {

    BLOCKS_UNTIL_START(): Promise<bigint> {
        return this.eth_call(functions.BLOCKS_UNTIL_START, [])
    }

    gameId(): Promise<bigint> {
        return this.eth_call(functions.gameId, [])
    }

    games(arg0: bigint): Promise<([player1: ([address_: string, score: number, totalBlocks: bigint] & {address_: string, score: number, totalBlocks: bigint}), player2: ([address_: string, score: number, totalBlocks: bigint] & {address_: string, score: number, totalBlocks: bigint}), puzzleSet: string, interval: number, numberOfRounds: number, startingBlock: bigint, stake: bigint] & {player1: ([address_: string, score: number, totalBlocks: bigint] & {address_: string, score: number, totalBlocks: bigint}), player2: ([address_: string, score: number, totalBlocks: bigint] & {address_: string, score: number, totalBlocks: bigint}), puzzleSet: string, interval: number, numberOfRounds: number, startingBlock: bigint, stake: bigint})> {
        return this.eth_call(functions.games, [arg0])
    }

    roundSubmitted(arg0: bigint, arg1: string, arg2: bigint): Promise<boolean> {
        return this.eth_call(functions.roundSubmitted, [arg0, arg1, arg2])
    }

    selectPuzzle(id: bigint): Promise<([roundBlockNumber: bigint, game: ([player1: ([address_: string, score: number, totalBlocks: bigint] & {address_: string, score: number, totalBlocks: bigint}), player2: ([address_: string, score: number, totalBlocks: bigint] & {address_: string, score: number, totalBlocks: bigint}), puzzleSet: string, interval: number, numberOfRounds: number, startingBlock: bigint, stake: bigint] & {player1: ([address_: string, score: number, totalBlocks: bigint] & {address_: string, score: number, totalBlocks: bigint}), player2: ([address_: string, score: number, totalBlocks: bigint] & {address_: string, score: number, totalBlocks: bigint}), puzzleSet: string, interval: number, numberOfRounds: number, startingBlock: bigint, stake: bigint}), puzzle: ([startingGrid: string, finalGrid: string, availableFunctions: Array<number>] & {startingGrid: string, finalGrid: string, availableFunctions: Array<number>})] & {roundBlockNumber: bigint, game: ([player1: ([address_: string, score: number, totalBlocks: bigint] & {address_: string, score: number, totalBlocks: bigint}), player2: ([address_: string, score: number, totalBlocks: bigint] & {address_: string, score: number, totalBlocks: bigint}), puzzleSet: string, interval: number, numberOfRounds: number, startingBlock: bigint, stake: bigint] & {player1: ([address_: string, score: number, totalBlocks: bigint] & {address_: string, score: number, totalBlocks: bigint}), player2: ([address_: string, score: number, totalBlocks: bigint] & {address_: string, score: number, totalBlocks: bigint}), puzzleSet: string, interval: number, numberOfRounds: number, startingBlock: bigint, stake: bigint}), puzzle: ([startingGrid: string, finalGrid: string, availableFunctions: Array<number>] & {startingGrid: string, finalGrid: string, availableFunctions: Array<number>})})> {
        return this.eth_call(functions.selectPuzzle, [id])
    }

    verifier(): Promise<string> {
        return this.eth_call(functions.verifier, [])
    }
}
