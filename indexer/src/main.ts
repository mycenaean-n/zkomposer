import { EvmBatchProcessor } from '@subsquid/evm-processor';
import { TypeormDatabase } from '@subsquid/typeorm-store';
import { lookupArchive } from '@subsquid/archive-registry';
import * as zKube from './abi/ZKube';
import { Game } from './model';

const ZKUBE_ADDRESS = '0x813678bE2b736e0027B42276ACF4D8b032c6885e';

const db = new TypeormDatabase();

const processor = new EvmBatchProcessor()
  .setGateway(lookupArchive('arbitrum-sepolia'))
  .setRpcEndpoint({
    url: process.env.RPC_URL,
    rateLimit: 10,
  })
  .setFinalityConfirmation(3)
  .setBlockRange({from: 18437053})
  .addLog({
    address: [ZKUBE_ADDRESS],
    topic0: [
      zKube.events.GameCreated.topic,
      zKube.events.GameJoined.topic,
      zKube.events.PlayerSubmitted.topic,
      zKube.events.GameResolved.topic,
    ],
  });

processor.run(db, async (ctx) => {
  const games: Map<bigint, Game> = new Map();   // map for caching games in the current batch
  for (const block of ctx.blocks) {
    for (const log of block.logs) {
      switch (log.topics[0]) {
        case zKube.events.GameCreated.topic:
      }
      const { gameId, player1, puzzleSet, stake, interval, numberOfTurns } =
        zKube.events.GameCreated.decode(log);
      games.set(gameId, 
        new Game({
          id: gameId.toString(),
          puzzleSet,
          player1,
          stake,
          interval: Number(interval),
          numberOfTurns: Number(numberOfTurns),
        })
      );
    }
  }
  ctx.store.insert([...games.values()])
});
