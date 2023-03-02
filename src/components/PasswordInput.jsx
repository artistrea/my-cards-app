import { useState } from "react";
import { useCards } from "../useCards";

export const PasswordInput = () => {
  const { setPassword: setAllRequestsPassword } = useCards();
  const [password, setPassword] = useState("");

  return (
    <>
      <label htmlFor="password">Password:</label>
      <input
        className="text-zinc-900 bg-white border-solid border-2 border-slate-900 rounded-md p-2 "
        type="password"
        id="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setAllRequestsPassword(e.target.value);
        }}
      />
    </>
  );
};
