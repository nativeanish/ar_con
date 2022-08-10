import { WarpWebFactory } from "warp-contracts";
import create from "zustand";
import Arweave from "arweave";
interface State {
  data: Array<string> | undefined;
  get: () => void;
}
export const config = {
  host: "testnet.redstone.tools",
  port: 443,
  protocol: "https",
  timeout: 20000,
  logging: false,
};
export const id = "TPVsJXw48-M3ezHxTMsmHeZ5627ck7_yX4kor4YjDKk";
const useShow = create<State>((set) => ({
  data: undefined,
  get: async () => {
    const arweave = Arweave.init(config);
    const warp = WarpWebFactory.memCachedBased(arweave)
      .useArweaveGateway()
      .build();
    const contract = warp.contract(id);
    const state = await contract.readState();
    //@ts-ignore
    set({ data: state.state.db });
  },
}));
export default useShow;
