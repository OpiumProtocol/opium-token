import { AggregatorInstance } from '../typechain/Aggregator'
import { OpiumTokenInstance } from './../typechain/OpiumToken.d'
const Aggregator = artifacts.require('Aggregator')
const OpiumToken = artifacts.require('OpiumToken')

let opium: OpiumTokenInstance
let aggregator: AggregatorInstance

const toE18 = (value: string) => web3.utils.toWei(value)

const m100 = toE18('100000000')

contract('Aggregator', ([ owner ]) => {
  before(async () => {
    aggregator = await Aggregator.new({ from: owner })
  })

  context('Initial setup', () => {
    it('should correctly initialize, add contracts/addresses, check totalTVL ', async () => {
      await aggregator.initialize({ from: owner }) 

      opium = await OpiumToken.new({ from: owner })

      await aggregator.addContract(owner, { from: owner })
      await aggregator.addToken(opium.address, { from: owner })

      const total = await aggregator.getTotalTVL()

      assert.equal(total[0][0], web3.utils.toBN(100), 'wrong amount')
    })
  })
})
