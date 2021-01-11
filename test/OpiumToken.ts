import { OpiumTokenInstance } from './../typechain/OpiumToken.d'

const OpiumToken = artifacts.require('OpiumToken')

let opium: OpiumTokenInstance

const toE18 = (value: string) => web3.utils.toWei(value)

const m100 = toE18('100000000')

contract('OpiumToken', ([ owner ]) => {
  before(async () => {
    opium = await OpiumToken.new({ from: owner })
  })

  context('Initial setup', () => {
    it('should correctly initialize and mint 100M $OPIUM', async () => {
      const name = await opium.name()
      const symbol = await opium.symbol()
      const decimals = await opium.decimals()

      const totalSupply = await opium.totalSupply()
      const ownerBalance = await opium.balanceOf(owner)

      assert.equal(name, 'Opium Governance Token', 'Wrong token name')
      assert.equal(symbol, 'OPIUM', 'Wrong token symbol')
      assert.equal(decimals.toString(), '18', 'Wrong token decimals')

      assert.equal(totalSupply.toString(), m100, 'Wrong token total supply')
      assert.equal(ownerBalance.toString(), m100, 'Wrong owner balance')
    })
  })
})
