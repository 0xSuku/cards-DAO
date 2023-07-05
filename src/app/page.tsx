'use client'

import { CardRanks, CardSuits } from "@/constants/cards";
import './page.scss';
import { useState } from "react";

export default function Home() {
  const [active, setActive] = useState({});

  const handleMouseOver = (param: string) => {
    setActive({[param]: true});
  };

  const handleMouseOut = (param: string) => {
    setActive({[param]: false});
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 cards">
        {
          (Object.keys(CardSuits) as Array<keyof typeof CardSuits>).map((suit) => (
            (Object.keys(CardRanks) as Array<keyof typeof CardRanks>).map((rank) => (
              <div key={suit + rank}>
                <div 
                className={active[rank.toLowerCase() + '_' + suit.toLowerCase() as keyof typeof active] ? `card animated${Math.random() < 0.5 ? '' : '2'}` : "card"}
                style={{ backgroundImage: `url('../../cards/${rank.toLowerCase()}_${suit.toLowerCase()}.jpg')` }} 
                onMouseOver={() => { handleMouseOver(rank.toLowerCase() + '_' + suit.toLowerCase()) }}
                onMouseOut ={() => { handleMouseOut(rank.toLowerCase() + '_' + suit.toLowerCase()) }}
                />
              </div>
            ))
          ))
        }
      </div>
    </main>
  )
}
