import { EvmBatchProcessor } from '@subsquid/evm-processor';
import { TypeormDatabase } from '@subsquid/typeorm-store';
import * as zKube from './abi/ZKube';
import { RPC_URL, ZKUBE_ADDRESS } from './config';
import { Solution } from './model';

const db = new TypeormDatabase();

const processor = new EvmBatchProcessor()
  .setRpcEndpoint({
    url: RPC_URL,
    rateLimit: 3,
  })
  .setFinalityConfirmation(3)
  .setBlockRange({ from: 88968899 })
  .addLog({
    address: [ZKUBE_ADDRESS],
    topic0: [zKube.events.SolutionSubmitted.topic],
  });

processor.run(db, async (ctx) => {
  for (const block of ctx.blocks) {
    for (const log of block.logs) {
      switch (log.topics[0]) {
        case zKube.events.SolutionSubmitted.topic: {
          const {
            puzzleSet,
            puzzleId,
            player,
            block: blockNumber,
          } = zKube.events.SolutionSubmitted.decode(log);

          await ctx.store.upsert(
            new Solution({
              id: `${puzzleSet}-${puzzleId}-${player}`,
              puzzleSet,
              puzzleId: puzzleId.toString(),
              player,
              blockNumber,
            })
          );
          break;
        }
      }
    }
  }
});
