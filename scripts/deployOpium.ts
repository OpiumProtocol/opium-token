const OpiumToken = artifacts.require('OpiumToken')

async function main() {
  const opium = await OpiumToken.new()

  console.log("$OPIUM deployed to:", opium.address)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
