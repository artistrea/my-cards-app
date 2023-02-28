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
    };

    this.cards.push(card);
    fs.writeFileSync(cardsPath, JSON.stringify(this.cards));

    res.json(card).status(201);
  };
}

export { CardsController };
