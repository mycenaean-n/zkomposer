import { EvmBatchProcessor } from '@subsquid/evm-processor';
import { TypeormDatabase } from '@subsquid/typeorm-store';
import { assertNotNull } from '@subsquid/util-internal';
import * as zKube from './abi/ZKube';
import { ZKUBE_ADDRESS } from './config';
import { Solution, User } from './model';

const db = new TypeormDatabase();

const processor = new EvmBatchProcessor()
  .setRpcEndpoint({
    url: assertNotNull(process.env.RPC_ARBITRUM_SEPOLIA_HTTP),
    rateLimit: 100,
  })
  .setFinalityConfirmation(3)
  .setBlockRange({ from: 92723829 })
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

          let user = await ctx.store.get(User, String(player));

          if (!user) {
            user = new User({ id: String(player) });
          }

          user.totalSolved = user.totalSolved ? user.totalSolved + 1 : 1;

          await ctx.store.upsert(user);

          await ctx.store.upsert(
            new Solution({
              id: `${puzzleSet}-${puzzleId}-${player}`,
              puzzleSet,
              puzzleId: puzzleId.toString(),
              player: user,
              blockNumber,
            })
          );

          break;
        }
      }
    }
  }
});
