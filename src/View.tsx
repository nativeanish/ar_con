import React, { useEffect } from "react";
import useShow from "./store/useShow";
const View = () => {
  const get = useShow((state) => state.get);
  const data = useShow((state) => state.data);
  useEffect(() => {
    get();
  }, []);
  return (
    <>
      {data && data.length ? (
        <>
          <h1>Here is the List of Data in smartweave</h1>
          <ul>
            {data.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        </>
      ) : (
        <h1>Getting the Data</h1>
      )}
    </>
  );
};
export default View;
