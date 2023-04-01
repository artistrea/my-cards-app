import { atom, useAtom } from "jotai";
import { useState, useEffect } from "react";
import { API_URL } from "./API_URL";

const cardsAtom = atom([]);
const passwordAtom = atom("");

export const useCards = () => {
  const [cards, setCards] = useAtom(cardsAtom);
  const [password, setPassword] = useAtom(passwordAtom);
  const [loading, setLoading] = useState(true);

  const commonHeaders = {
    "Content-Type": "application/json",
    "X-Password": password,
  };

  useEffect(() => {
    if (cards.length > 0) {
      return;
    }
    async function fetchCards() {
      const data = await fetch(`${API_URL}/cards`).then((res) => res.json()).catch(alert)

      setCards(data);
      setLoading(false);
    }
    fetchCards();
  }, []);

  function addCard(newCard) {
    fetch(`${API_URL}/cards`, {
      method: "POST",
      headers: commonHeaders,
      body: JSON.stringify(newCard),
    })
      .then((response) => response.json())
      .then((data) => {
        setCards([...cards, data]);
      });
  }

  function deleteCard(id) {
    fetch(`${API_URL}/cards/${id}`, {
      method: "DELETE",
      headers: commonHeaders,
    }).then(() => {
      setCards(cards.filter((card) => card.id !== id));
    });
  }

  function updateCard(updatedCard) {
    fetch(`${API_URL}/cards/${updatedCard.id}`, {
      method: "PUT",
      headers: commonHeaders,
      body: JSON.stringify(updatedCard),
    })
      .then((response) => response.json())
      .then((data) => {
        setCards((cards) =>
          cards.map((card) => {
            if (card.id === data.id) {
              return data;
            }
            return card;
          })
        );
      });
  }

  return { cards, loading, addCard, deleteCard, updateCard, setPassword };
};
