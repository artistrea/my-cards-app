import { useState } from "react";

const API_URL = "http://localhost:3000/api";

function App() {
  const [cards, setCards] = useState([]);

  function handleCreateCard(event) {
    event.preventDefault();

    const description = event.target.elements.description.value;

    const newCard = {
      description,
    };

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
  }

  return (
    <div className="bg-neutral-700 w-full min-h-screen text-neutral-100">
      <div className="mx-auto w-full xl:w-3/6">
        <ul className="flex flex-col gap-2 bg-stone-800 p-10">
          {cards.map((card) => (
            <li key={card.id} className="flex">
              <p className="flex-1">{card.description}</p>

              <button
                className="bg-slate-500 border-solid border-x-2 border-slate-200 rounded-md p-2"
                onClick={() => {
                  setCards(cards.filter((c) => c.id !== card.id));
                }}
              >
                Done
              </button>
            </li>
          ))}
        </ul>

        <form
          onSubmit={handleCreateCard}
          className="flex justify-around items-center"
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
    </div>
  );
}

export { App };
