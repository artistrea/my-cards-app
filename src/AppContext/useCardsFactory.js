import { useState, useEffect } from "react";
import { API_URL } from "../API_URL";

export function useCardsFactory({
  cards,
  setCards,
  password,
  loading,
  setLoading,
}) {
  function responseHandler(response) {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.status);
  }

  function useCards() {
    const commonHeaders = {
      "Content-Type": "application/json",
      "X-Password": password,
    };

    useEffect(() => {
      if (cards.length > 0) {
        return;
      }
      async function fetchCards() {
        fetch(`${API_URL}/cards`)
          .then(responseHandler)
          .then((data) => {
            setCards(data);
            setLoading(false);
          })
          .catch((error) => {
            alert(error);
          });
      }
      fetchCards();
    }, []);

    function addCard(newCard) {
      fetch(`${API_URL}/cards`, {
        method: "POST",
        headers: commonHeaders,
        body: JSON.stringify(newCard),
      })
        .then(responseHandler)
        .then((data) => {
          setCards([...cards, data]);
        })
        .catch((error) => {
          alert(error);
        });
    }

    function deleteCard(id) {
      fetch(`${API_URL}/cards/${id}`, {
        method: "DELETE",
        headers: commonHeaders,
      })
        .then(responseHandler)
        .then(() => {
          setCards(cards.filter((card) => card.id !== id));
        })
        .catch((error) => {
          alert(error);
        });
    }

    function updateCard(updatedCard) {
      fetch(`${API_URL}/cards/${updatedCard.id}`, {
        method: "PUT",
        headers: commonHeaders,
        body: JSON.stringify(updatedCard),
      })
        .then(responseHandler)
        .then((data) => {
          setCards((cards) =>
            cards.map((card) => {
              if (card.id === data.id) {
                return data;
              }
              return card;
            })
          );
        })
        .catch((error) => {
          alert(error);
        });
    }

    return { cards, loading, addCard, deleteCard, updateCard };
  }

  return useCards;
}
