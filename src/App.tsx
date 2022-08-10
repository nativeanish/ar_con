import React, { useEffect } from "react";
import Input from "./Input";
import useWallet from "./store/useWallet";
import View from "./View";
const App = () => {
  const config = useWallet((e) => e.config);
  const wallet = useWallet((e) => e.wallet);
  const address = useWallet((e) => e.address);
  const ogin = useWallet((e) => e.login);
  useEffect(() => {
    config();
  });
  const login = () => {
    ogin();
  };
  const logout = () => {
    window.arweaveWallet.disconnect().then(() => document.location.reload());
  };
  return (
    <>
      {wallet && wallet.length ? (
        address && address.length ? (
          <>
            <button onClick={() => logout()}>Logout</button>
            <hr />
            <br />
            <View />
            <hr />
            <br />
            <Input />
          </>
        ) : (
          <h1>
            Please Login In <button onClick={() => login()}>Login</button>
          </h1>
        )
      ) : (
        <h1>
          Please Install ArConnect Wallet{" "}
          <a href="https://www.arconnect.io/" target="_blank">
            ArConnect
          </a>
        </h1>
      )}
    </>
  );
};
export default App;
