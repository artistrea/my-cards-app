import { CardsController } from "../controllers/cardsController.js";

const cardsController = new CardsController();

export const routes = {
  GET: {
    cards: cardsController.getCards,
  },
  POST: {
    cards: cardsController.createCard,
  },
  DELETE: {
    cards: {
      ":id": cardsController.deleteCard,
    },
  },
};
