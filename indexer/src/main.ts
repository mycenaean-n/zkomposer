import { EvmBatchProcessor } from '@subsquid/evm-processor'
import { TypeormDatabase } from '@subsquid/typeorm-store'
import { lookupArchive } from '@subsquid/archive-registry'
import * as zKube from './abi/ZKube'
import { Game } from './model'

const ZKUBE_ADDRESS = '0x3BC7e6383311c52C3D14cc3ca258B15253582Cac'

const processor = new EvmBatchProcessor()
  .setGateway(lookupArchive("arbitrum-sepolia"))
  .setRpcEndpoint({
    url: process.env.RPC_URL,
    rateLimit: 10
  })
  .setFinalityConfirmation(3)
  .addLog({
    address: ZKUBE_ADDRESS,
    topic0: zKube.
  })