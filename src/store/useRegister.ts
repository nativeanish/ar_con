import create from "zustand";
import { config, id } from "./useShow";
import Arweave from "arweave";
import { mineBlock } from "../../deploy";
import { WarpWebFactory } from "warp-contracts";
interface State {
  data: string;
  show: () => void;
}
const useRegister = create<State>((set, get) => ({
  data: "",
  show: async () => {
    const _data = get().data;
    if (_data.length) {
      const arweave = Arweave.init(config);
      const warp = WarpWebFactory.memCachedBased(arweave)
        .useArweaveGateway()
        .build();
      const contract = warp.contract(id).connect("use_wallet");
      await contract.writeInteraction({ function: "register", text: _data });
      await mineBlock(arweave);
      window.location.reload();
    }
  },
}));

export default useRegister;
