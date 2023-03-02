import fs from "fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cardsPath = path.join(__dirname, "../data/cards.json");

class CardsController {
  constructor() {
    try {
      const file = fs.readFileSync(cardsPath, "utf-8");
      this.cards = JSON.parse(file);
    } catch (error) {
      this.cards = [];
    }
  }

  getCards = (req, res) => {
    if (req.method !== "GET") {
      res.status(405).json({ message: "Method not allowed" });
      return;
    }

    res.json(this.cards);
  };

  createCard = (req, res) => {
    if (req.method !== "POST") {
      res.status(405).json({ message: "Method not allowed" });
      return;
    }

    const card = {
      id: Date.now(),
      description: req.body.description,
      priority: "",
    };

    this.cards.push(card);
    this.saveCards();

    res.json(card).status(201);
  };

  deleteCard = (req, res, params) => {
    if (req.method !== "DELETE") {
      res.status(405).json({ message: "Method not allowed" });
      return;
    }

    const cardId = Number(params.id);

    const newCards = this.cards.filter((card) => card.id !== cardId);

    if (newCards.length === this.cards.length) {
      res.status(404).json({ message: "Card not found" });
      return;
    }

    this.cards = newCards;
    this.saveCards();

    res.status(204).end();
  };

  updateCard = (req, res, params) => {
    if (req.method !== "PUT") {
      res.status(405).json({ message: "Method not allowed" });
      return;
    }

    const cardId = Number(params.id);

    const card = this.cards.find((card) => card.id === cardId);

    if (!card) {
      res.status(404).json({ message: "Card not found" });
      return;
    }

    const updatedCard = {
      ...card,
      description: req.body.description,
      priority: req.body.priority,
    };

    this.cards = this.cards.map((card) => {
      if (card.id === cardId) {
        return updatedCard;
      }
      return card;
    });

    this.saveCards();

    res.json(updatedCard).status(200);
  };

  saveCards = () => {
    fs.writeFileSync(cardsPath, JSON.stringify(this.cards));
  };
}

export { CardsController };
