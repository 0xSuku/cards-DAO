import { useState } from "react";

interface Card {
    cardKey: string;
    animatedClass: string;
    cardColor: string;
}

export default function Card(params: { card: Card, selectCard: Function }) {
    const [hover, setHover] = useState({});

    const card = params.card;

    const handleMouseOver = (param: string) => {
        setHover({ [param]: true });
    };

    const handleMouseOut = (param: string) => {
        setHover({ [param]: false });
    };

    const onClick = () => {
        params.selectCard(card)
    }

    return (
        <div className="card-container" onClick={onClick}>
            <div
                className={hover[card.cardKey as keyof typeof hover] ? `card ${card.cardColor} ${card.animatedClass}` : `card ${card.cardColor}`}
                style={{ backgroundImage: `url('../../cards/${card.cardKey}.png')` }}
                onMouseOver={() => { handleMouseOver(card.cardKey) }}
                onMouseOut={() => { handleMouseOut(card.cardKey) }}
            />
            <div className="card card-back" />
        </div>
    )
}