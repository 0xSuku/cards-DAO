'use client'

import { CardRanks, CardSuits } from "@/constants/cards";
import Card from "./components/card";
import { useEffect, useState } from "react";
import './page.scss';
import cardsText from '../cards-config.json';


export default function Home() {
  const [scrollTop, setScrollTop] = useState(0);
  const [activeCardKey, setActiveCardKey] = useState<string>();

  let cards: string[] = [];
  (Object.keys(CardSuits) as Array<keyof typeof CardSuits>).forEach((suit) => {
    cards.push(
      ...(Object.keys(CardRanks) as Array<keyof typeof CardRanks>).map((rank) => {
        const cardKey = rank.toLowerCase() + '_' + suit.toLowerCase();

        return cardKey;
      })
    );
  });

  const selectCard = (card: string) => {
    setActiveCardKey((oldCard) => (oldCard === card ? undefined : card));
  }

  const onScroll = () => {
    // This will calculate how many pixels the page is vertically
    const winScroll = document.documentElement.scrollTop;
    // This is responsible for subtracticing the total height of the page - where the users page is scrolled to
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    // This will calculate the final total of the percentage of how much the user has scrolled.
    const scrolled = (winScroll / height) * 100;

    setScrollTop(scrolled);
  };

  useEffect(() => {


    function handleEscapeKey(event: KeyboardEvent) {
      if (event.code === 'Escape') {
        selectCard('');
      }
    }

    window.addEventListener("scroll", onScroll);
    window.removeEventListener("scroll", onScroll);

    document.addEventListener('keydown', handleEscapeKey)
    return () => document.removeEventListener('keydown', handleEscapeKey)
  }, []);


  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="progressMainWrapper">
        <div
          className="progressMainStyle"
          style={{ width: `${scrollTop}%` }}
        ></div>
      </div>
      <div className="grid max-[600px]:grid-cols-1 grid-cols-3 md:grid-cols-4 max-[600px]:gap-6 gap-8 cards">
        {
          cards.map((card) => (
            <div key={card} className="grid-card">
              <Card cardKey={card} selectCard={selectCard} />
            </div>
          ))
        }
      </div>
      {
        activeCardKey && (
          <div className='card-details bg-blend-lighten'>
            <div className="card-details__background" onClick={() => selectCard(activeCardKey)}>
              <div className="card-details__content" onClick={(e) => e.stopPropagation()}>
                <div className="close_container">
                  <div className="close warp black" onClick={() => selectCard('')}></div>
                </div>
                <div className="grid-card">
                  <Card cardKey={activeCardKey} selectCard={() => { }} avoidSpin={true} />
                </div>
                <div className="card-details__content__text">
                  <div className="card-details__content__text__title">
                    {cardsText[activeCardKey as keyof typeof cardsText].title}
                  </div>
                  <div className="card-details__content__text__description">
                    {cardsText[activeCardKey as keyof typeof cardsText].description}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </main>
  )
}
