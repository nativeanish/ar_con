import React, { useState } from "react";
import useRegister from "./store/useRegister";
const Input = () => {
  const [text, setText] = useState<string>("");
  const da = useRegister((state) => state.show);
  const submit = (e: React.SyntheticEvent<HTMLElement>) => {
    e.preventDefault();
    useRegister.setState({ data: text });
    da();
    setText("");
  };
  return (
    <>
      <h1>Register Data</h1>
      <form onSubmit={submit}>
        <input
          type="text"
          onChange={(e) => setText(e.currentTarget.value)}
          value={text}
        />
        <button type="submit">Register</button>
      </form>
    </>
  );
};
export default Input;
