const NETWORK_ID = 5777

export const loadContract = async (name, Web3) => {
  const res = await fetch(`/contracts/${name}.json`)
  const Artifact = await res.json()
  const web3 = new Web3(window.ethereum || "ws://localhost:7545")
  let contract;

  try {
    web3.handleRevert = true
  contract = new web3.eth.Contract(
      Artifact.abi,
      Artifact.networks[NETWORK_ID].address,
    )
  } catch {
    console.log(`Contract ${name} cannot be loaded`)
  }
  return contract
}