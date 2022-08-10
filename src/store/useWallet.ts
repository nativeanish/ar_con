import create from "zustand";
import { config } from "./useShow";
interface State {
  wallet: undefined | "arconnect";
  address: null | string;
  config: () => void;
  login: () => void;
}
const useWallet = create<State>((set, get) => ({
  wallet: undefined,
  address: null,
  config: async () => {
    window.addEventListener("arweaveWalletLoaded", async () => {
      if (window.arweaveWallet.walletName.length) {
        try {
          const _address = await window.arweaveWallet.getActiveAddress();
          if (_address && _address.length) {
            set({ wallet: "arconnect" });
            set({ address: _address });
          }
        } catch (e) {
          set({ wallet: "arconnect" });
        }
      }
    });
  },
  login: async () => {
    await window.arweaveWallet.connect(
      ["ACCESS_ADDRESS", "ACCESS_ARWEAVE_CONFIG", "SIGN_TRANSACTION"],
      { name: "dio" },
      { host: config.host, port: config.port, protocol: "https" }
    );
    const _address = await window.arweaveWallet.getActiveAddress();
    if (_address && _address.length) {
      set({ wallet: "arconnect" });
      set({ address: _address });
    }
  },
}));
export default useWallet;
