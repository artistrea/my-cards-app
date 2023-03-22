import { createContext } from "react";
import { useCardsFactory } from "./useCardsFactory";

const AppContext = createContext({
  password: "",
  setPassword: () => {},
});

export function AppContextProvider({ children }) {
  const [cards, setCards] = useState([]);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);

  const useCards = useCardsFactory({
    cards,
    setCards,
    password,
    loading,
    setLoading,
  });

  return (
    <AppContext.Provider value={{ setPassword, useCards }}>
      {children}
    </AppContext.Provider>
  );
}
