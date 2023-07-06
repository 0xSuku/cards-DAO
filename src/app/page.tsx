'use client'

import { CardRanks, CardSuits } from "@/constants/cards";
import Card from "./components/card";
import { useState } from "react";
import './page.scss';

interface Card {
  cardKey: string;
  animatedClass: string;
  cardColor: string;
}

export default function Home() {
  const [active, setActive] = useState('');

  let cards: Card[] = [];
  (Object.keys(CardSuits) as Array<keyof typeof CardSuits>).forEach((suit) => {
    cards.push(
      ...(Object.keys(CardRanks) as Array<keyof typeof CardRanks>).map((rank) => {
        const cardKey = rank.toLowerCase() + '_' + suit.toLowerCase();
        const animatedClass = 'animated' + (Math.floor(Math.random() * (3 - 1 + 1)) + 1);
        const cardColor = 'card' + (Math.floor(Math.random() * (5 - 1 + 1)) + 1);

        return {
          cardKey,
          animatedClass,
          cardColor
        }
      })
    );
  });

  const selectCard = (card: Card) => {
    debugger;
    setActive(card.cardKey);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="grid max-[420px]:grid-cols-1 grid-cols-3 md:grid-cols-4 max-[420px]:gap-6 gap-3 cards">
        {
          cards.map((card) => (
            <div key={card.cardKey}>
              <Card card={card} selectCard={selectCard} />
            </div>
          ))
        }
      </div>
    </main>
  )
}
