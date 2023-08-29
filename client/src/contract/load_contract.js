import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers";
const NETWORK_ID = 5777;
let address;

export const loadContract = async (name) => {
  const res = await fetch(`/contracts/${name}.json`);
  const Artifact = await res.json();

  let contract;

  try {
    let eth_provider = await detectEthereumProvider();
    const provider = new ethers.providers.Web3Provider(eth_provider);
    if (provider) {
      const account = await eth_provider.request({ method: "eth_accounts" });
      // if (account.length <= 0) {
      //   window.ethereum.enable();
      // }
      if (account.length > 0) {
        address = account[0] || "";
        const signer = provider.getSigner();
        contract = new ethers.Contract(
          Artifact.networks[NETWORK_ID].address,
          Artifact.abi,
          signer
        );
      }
    }
  } catch (e) {
    console.log(e);
    console.log(`Contract ${name} cannot be loaded`);
  }
  return { contract, address };
};
