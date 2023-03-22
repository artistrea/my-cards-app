import { useContext } from "react";
import { AppContextProvider } from "./Provider";

export function useAppContext() {
  const context = useContext(AppContextProvider);
  if (context === undefined) {
    throw new Error("useAppContext must be used within a AppContextProvider");
  }

  return context;
}
