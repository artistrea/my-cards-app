import { BookmarkMinus, BookmarkPlus } from "lucide-react";
import { useRef, useState } from "react";
import { Card } from "./components/Card";
import { PasswordInput } from "./components/PasswordInput";
import { RadioInput } from "./components/RadioInput";
import { useCards } from "./useCards";
import { useAutoAnimate } from "@formkit/auto-animate/react";

function App() {
  const { cards, loading, addCard } = useCards();
  const [selectedPriority, setSelectedPriority] = useState("");
  const [animatedElementRef] = useAutoAnimate();

  const shownCards = cards.filter((card) => {
    return selectedPriority === "" || card.priority === selectedPriority;
  });

  const timeoutRef = useRef();

  function handleCreateCard(e) {
    e.preventDefault();

    const description = e.target.elements.description.value;

    const newCard = {
      description,
    };

    addCard(newCard);
  }

  return (
    <div className="bg-neutral-700 w-full min-h-screen text-neutral-100 flex flex-col">
      <div className="flex flex-wrap justify-around mx-auto w-full xl:w-3/6">
        <span
          className={`text-gray-400 flex p-2 ${
            selectedPriority === "" && "bg-slate-900"
          }`}
        >
          <RadioInput
            onChange={(e) => setSelectedPriority(e.target.value)}
            type="radio"
            name="selectedPriority"
            value=""
            id="Not Important"
          >
            <BookmarkMinus />
          </RadioInput>
        </span>
        <span
          className={`text-yellow-400 flex p-2 ${
            selectedPriority === "Important" && "bg-slate-900"
          }`}
        >
          <RadioInput
            onChange={(e) => setSelectedPriority(e.target.value)}
            type="radio"
            name="selectedPriority"
            value="Important"
            id="important"
          >
            <BookmarkPlus />
          </RadioInput>
        </span>
      </div>
      <div className="mx-auto w-full xl:w-3/6">
        <ul
          ref={animatedElementRef}
          className="flex flex-col gap-2 bg-stone-800 p-10"
        >
          {loading && <p>Carregando...</p>}

          {shownCards.map((card) => (
            <li key={card.id}>
              <Card card={card} />
            </li>
          ))}
        </ul>

        <form
          onSubmit={handleCreateCard}
          className="flex justify-around items-center flex-wrap"
        >
          <label className="flex items-center" htmlFor="description">
            Description:
          </label>
          <textarea
            className="text-zinc-900 bg-white border-solid border-2 border-slate-900 rounded-md p-2 "
            type="text"
            id="description"
            name="description"
          />
          <button
            className="bg-slate-400 border-solid border-2 border-slate-400 rounded-md p-2"
            type="submit"
          >
            Criar
          </button>
        </form>
      </div>
      <div className="ml-auto mt-auto">
        <PasswordInput />
      </div>
    </div>
  );
}

export { App };
