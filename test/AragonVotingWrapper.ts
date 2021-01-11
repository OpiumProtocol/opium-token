import { OpiumTokenInstance } from '../typechain/OpiumToken'
import { AragonVotingWrapperInstance } from '../typechain/AragonVotingWrapper'
import { VotingTokenInstance } from '../typechain/VotingToken'

const OpiumToken = artifacts.require('OpiumToken')
const AragonVotingWrapper = artifacts.require('AragonVotingWrapper')
const VotingToken = artifacts.require('VotingToken')

let opium: OpiumTokenInstance
let wrapper: AragonVotingWrapperInstance
let voting: VotingTokenInstance

const toE18 = (value: string) => web3.utils.toWei(value)
const fromE18 = (value: string | BN) => web3.utils.fromWei(value)

const m100 = toE18('100000000')
const k5 = toE18('5000')
const k2 = toE18('2000')

contract('AragonVotingWrapper', ([ owner, holder ]) => {
  before(async () => {
    opium = await OpiumToken.new({ from: owner })
    voting = await VotingToken.new({ from: owner })
    wrapper = await AragonVotingWrapper.new(opium.address, voting.address, { from: owner })

    await voting.transfer(wrapper.address, m100, { from: owner })
    await opium.transfer(holder, k5, { from: owner })
  })

  context('Initial setup', () => {
    it('should correctly initialize, mint 100M $vOPIUM and transfer them to wrapper', async () => {
      const name = await voting.name()
      const symbol = await voting.symbol()
      const decimals = await voting.decimals()

      const totalSupply = await voting.totalSupply()
      const wrapperBalance = await voting.balanceOf(wrapper.address)

      assert.equal(name, 'Opium Governance Aragon Token', 'Wrong token name')
      assert.equal(symbol, 'vOPIUM', 'Wrong token symbol')
      assert.equal(decimals.toString(), '18', 'Wrong token decimals')

      assert.equal(totalSupply.toString(), m100, 'Wrong token total supply')
      assert.equal(wrapperBalance.toString(), m100, 'Wrong wrapper balance')
    })

    it('should correctly initialize AragonVotingWrapper', async () => {
      const opiumAddress = await wrapper.opium()
      const votingAddress = await wrapper.voting()

      assert.equal(opiumAddress, opium.address, 'Wrong OPIUM address')
      assert.equal(votingAddress, voting.address, 'Wrong vOPIUM address')
    })
  })

  context('Wrapping', () => {
    it('should successfully exchange 5000 OPIUM for 5000 vOPIUM', async () => {
      const holderOpiumBalanceBefore = await opium.balanceOf(holder)
      const holderVotingBalanceBefore = await voting.balanceOf(holder)

      await opium.approve(wrapper.address, k5, { from: holder })
      await wrapper.wrap(k5, { from: holder })

      const holderOpiumBalanceAfter = await opium.balanceOf(holder)
      const holderVotingBalanceAfter = await voting.balanceOf(holder)

      assert.equal(+fromE18(holderOpiumBalanceAfter), +fromE18(holderOpiumBalanceBefore) - 5000, 'Wrong holder OPIUM balance')
      assert.equal(+fromE18(holderVotingBalanceAfter), +fromE18(holderVotingBalanceBefore) + 5000, 'Wrong holder vOPIUM balance')
    })
    it('should successfully exchange 2000 vOPIUM for 2000 OPIUM', async () => {
      const holderOpiumBalanceBefore = await opium.balanceOf(holder)
      const holderVotingBalanceBefore = await voting.balanceOf(holder)

      await voting.approve(wrapper.address, k2, { from: holder })
      await wrapper.unwrap(k2, { from: holder })

      const holderOpiumBalanceAfter = await opium.balanceOf(holder)
      const holderVotingBalanceAfter = await voting.balanceOf(holder)

      assert.equal(+fromE18(holderOpiumBalanceAfter), +fromE18(holderOpiumBalanceBefore) + 2000, 'Wrong holder OPIUM balance')
      assert.equal(+fromE18(holderVotingBalanceAfter), +fromE18(holderVotingBalanceBefore) - 2000, 'Wrong holder vOPIUM balance')
    })
  })
})
