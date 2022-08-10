import Arweave from "arweave";
import { JWKInterface } from "arweave/node/lib/wallet";
import fs from "fs";
import { WarpNodeFactory } from "warp-contracts";
(async () => {
  const arweave = Arweave.init({
    host: "testnet.redstone.tools",
    port: 443,
    protocol: "https",
    timeout: 20000,
  });
  const warp = WarpNodeFactory.memCachedBased(arweave)
    .useArweaveGateway()
    .build();
  /**
     *   const wallet = await arweave.wallets.generate();
  await addFunds(arweave,wallet)
  const contractSrc = fs.readFileSync("./contract/contract.js", "utf8");
  const json = fs.readFileSync("./contract/init.json","utf-8");
  const deploy = await warp.createContract.deploy({
    wallet,
    src: contractSrc,
    initState: json
  });
  await mineBlock(arweave)
  const contract = warp.contract(deploy.contractTxId).connect(wallet)
  await contract.writeInteraction({function:"register",text:"nativeanish"});
  await mineBlock(arweave)

  console.log(`the id is ${deploy.contractTxId  }`)
     */
  const id = "TPVsJXw48-M3ezHxTMsmHeZ5627ck7_yX4kor4YjDKk";
  const contract = warp.contract(id);
  const state = await contract.viewState({
    function: "get",
    text: "nativeanish",
  });
  console.log(state.result);
})();
async function addFunds(arweave: Arweave, wallet: JWKInterface) {
  const walletAddress = await arweave.wallets.getAddress(wallet);
  await arweave.api.get(`/mint/${walletAddress}/1000000000000000`);
}
export async function mineBlock(arweave: Arweave) {
  await arweave.api.get("mine");
}

