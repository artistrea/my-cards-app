import { useState, useEffect } from "react";
import { API_URL } from "./API_URL";

export const useCards = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function () {
      const data = await fetch(`${API_URL}/cards`).then((res) => res.json());

      setCards(data);
      setLoading(false);
    })();
  }, []);

  const addCard = (newCard) => {
    fetch(`${API_URL}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCard),
    })
      .then((response) => response.json())
      .then((data) => {
        setCards([...cards, data]);
      });
  };

  return { cards, loading, addCard };
};
