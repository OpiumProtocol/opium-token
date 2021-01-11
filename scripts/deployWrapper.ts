const AragonVotingWrapper = artifacts.require('AragonVotingWrapper')

async function main() {
  const opium = ''
  const voting = ''
  const wrapper = await AragonVotingWrapper.new(opium, voting)

  console.log("Wrapper deployed to:", wrapper.address)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
