import { EvmBatchProcessor } from '@subsquid/evm-processor';
import { TypeormDatabase } from '@subsquid/typeorm-store';
import * as zKube from './abi/ZKube';
import { Game } from './model';
import { RPC_URL, ZKUBE_ADDRESS } from './config';

const db = new TypeormDatabase();

const processor = new EvmBatchProcessor()
  .setRpcEndpoint({
    url: RPC_URL,
    rateLimit: 100
  })
  .setFinalityConfirmation(3)
  .setBlockRange({ from: 3167802 })
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
  const games: Map<bigint, Game> = new Map(); // map for caching games in the current batch

  for (const block of ctx.blocks) {
    for (const log of block.logs) {
      switch (log.topics[0]) {
        case zKube.events.GameCreated.topic: {
          const { gameId, player1, puzzleSet, interval, numberOfTurns } =
            zKube.events.GameCreated.decode(log);
          games.set(
            gameId,
            new Game({
              id: gameId.toString(),
              puzzleSet,
              player1,
              interval: Number(interval),
              numberOfTurns: Number(numberOfTurns),
            })
          );
          break;
        }
        case zKube.events.GameJoined.topic: {
          const { gameId, player2, startingBlock } = zKube.events.GameJoined.decode(log);
          let game = games.get(gameId);
          if(!game) {
            game = await ctx.store.get(Game, gameId.toString());
            games.set(gameId, game);
          }
          game.player2 = player2;
          game.startingBlock = startingBlock;
          break;
        }
      }
    }
  }
  await ctx.store.upsert([...games.values()]);
});
