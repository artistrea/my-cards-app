import { atom, useAtom } from "jotai";
import { useState, useEffect } from "react";
import { API_URL } from "./API_URL";

const cardsAtom = atom([]);

export const useCards = () => {
  const [cards, setCards] = useAtom(cardsAtom);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);

  const commonHeaders = {
    "Content-Type": "application/json",
    "X-Password": password,
  };

  useEffect(() => {
    (async function () {
      const data = await fetch(`${API_URL}/cards`).then((res) => res.json());

      setCards(data);
      setLoading(false);
    })();
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
        console.log(data);

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
