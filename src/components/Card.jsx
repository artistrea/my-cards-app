import { BookmarkMinus, BookmarkPlus, Trash2 } from "lucide-react";
import { useState, useRef } from "react";
import { useCards } from "../useCards";

export const Card = ({ card: originalCard }) => {
  const { deleteCard, updateCard } = useCards();
  const [card, setCard] = useState(originalCard);
  const timeoutRef = useRef();

  function handleCardChange(e, card) {
    const propName = e.target.name;
    const value = e.target.value;

    if (propName === "id") {
      // Não faça cagada, caro programador
      throw new Error("Não é possível alterar o id");
    }

    clearTimeout(timeoutRef.current);

    setCard({ ...card, [propName]: value });

    timeoutRef.current = setTimeout(() => {
      updateCard({ ...card, [propName]: value });
    }, 1000);
  }

  return (
    <div
      key={card.id}
      className="flex flex-wrap border border-slate-500 border-solid p-3"
    >
      <textarea
        onChange={(e) => handleCardChange(e, card)}
        className="flex-1 bg-stone-800 max-w-full h-40"
        type="text"
        name="description"
        value={card.description}
      ></textarea>

      <div className="p-3 flex flex-wrap flex-col">
        <button
          className="text-red-500 rounded-md p-2"
          onClick={() => {
            deleteCard(card.id);
          }}
        >
          <Trash2 />
        </button>
        <button
          name="priority"
          value="Important"
          className="text-yellow-400 rounded-md p-2"
          onClick={() => {
            updateCard({ ...card, priority: "Important" });
          }}
        >
          <BookmarkPlus />
        </button>
        <button
          name="priority"
          value=""
          className="text-gray-400 rounded-md p-2"
          onClick={() => {
            updateCard({ ...card, priority: "" });
          }}
        >
          <BookmarkMinus />
        </button>
      </div>
    </div>
  );
};
