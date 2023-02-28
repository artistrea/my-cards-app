import { CardsController } from "./controllers/cardsController.js";

const cardsController = new CardsController();

const requestHandlers = {
  GET: {
    "/cards": cardsController.getCards,
  },
  POST: {
    "/cards": cardsController.createCard,
  },
};

export const handleApiRequest = async (req, res) => {
  const { method, originalUrl } = req;

  const apiRoute = originalUrl.replace("/api/", "/");

  const handler = requestHandlers[method][apiRoute];

  if (handler) {
    await handler(req, res);
  } else {
    res.status(404).json({ message: "Route Not found" });
  }
};
