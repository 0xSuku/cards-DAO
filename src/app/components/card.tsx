interface Card {
    cardKey: string;
    animatedClass: string;
}

export default function Card(params: { card: Card, selectCard: Function }) {
    const card = params.card;

    const onClick = () => {
        params.selectCard(card)
    }

    return (
        <div className="card-container" onClick={onClick}>
            <div
                className={`card ${card.animatedClass}`}
                style={{ backgroundImage: `url('../../cards/${card.cardKey}.jpg')` }}
            />
            <div className="card card-back" />
        </div>
    )
}