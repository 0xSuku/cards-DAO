'use client'

import { CardRanks, CardSuits } from "@/constants/cards";
import Card from "./components/card";
import { useEffect, useState } from "react";
import './page.scss';
import cardsText from '../cards-config.json';


export default function Home() {
  const [scrollTop, setScrollTop] = useState(0);
  const [activeCardKey, setActiveCardKey] = useState<string>();
  const [isMobile, setIsMobile] = useState(false);
  const [cards, setCards] = useState<string[]>([]);
  const [jokers, setJokers] = useState<string[]>([]);

  const setCardsByRanks = () => {
    let _cards: string[] = [];
    (Object.keys(CardSuits) as Array<keyof typeof CardSuits>).forEach((suit) => {
      _cards.push(
        ...(Object.keys(CardRanks) as Array<keyof typeof CardRanks>).map((rank) => {
          const cardKey = rank.toLowerCase() + '_' + suit.toLowerCase();
  
          return cardKey;
        })
      );
    });
    setCards(_cards);
    setJokers(['joker_black', 'joker_red']);
  }

  const setCardsBySuits = () => {
    let _cards: string[] = [];
    (Object.keys(CardRanks) as Array<keyof typeof CardRanks>).forEach((rank) => {
      _cards.push(
        ...(Object.keys(CardSuits) as Array<keyof typeof CardSuits>).map((suit) => {
          const cardKey = rank.toLowerCase() + '_' + suit.toLowerCase();
  
          return cardKey;
        })
      );
    });
    setCards(_cards);
    setJokers(['joker_black', 'joker_red']);
  }

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
    if (isMobile) {
      setCardsByRanks();
    } else {
      setCardsBySuits();
    }
  }, [isMobile]);

  useEffect(() => {
    
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.code === 'Escape') {
        selectCard('');
      }
    }

    //choose the screen size 
    const handleResize = () => {
      window.innerWidth < 720 ? setIsMobile(true) : setIsMobile(false);
    }

    window.addEventListener("resize", handleResize);
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
      <div className="grid max-[720px]:grid-cols-1 grid-cols-4 max-[720px]:gap-6 gap-8 cards">
        {
          cards.map((card) => (
            <div key={card} className="grid-card">
              <Card cardKey={card} selectCard={selectCard} />
            </div>
          ))
        }
      </div>
      <div className="grid max-[720px]:grid-cols-1 grid-cols-2 max-[720px]:gap-6 gap-8 cards jokers">
        {
          jokers.map((joker) => (
            <div key={joker} className="grid-card">
              <Card cardKey={joker} selectCard={selectCard} />
            </div>
          ))
        }
      </div>
      <div className="footer">
      <a href="https://www.daocraft.cx/" target="_blank"><img src="images/DAOcraft_wordmark.png" loading="lazy" /></a>
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
