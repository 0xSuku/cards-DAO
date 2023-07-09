import { useState } from 'react';
import './card.scss';

export default function Card(params: { cardKey: string, selectCard: Function }) {
    const [spinIt, setSpinIt] = useState(false);
    const cardKey = params.cardKey;

    const onClick = () => {
        setSpinIt(true);
        setTimeout(() => {
            params.selectCard(cardKey);
        }, 500);
        setTimeout(() => {
            setSpinIt(false);
        }, 2000);
    }

    return (
        <div className={`card-container ${spinIt ? 'spin' : ''}`} onClick={onClick}>
            <div className="flipper">
                <div
                    className={`card card-front`}
                    style={{ backgroundImage: `url('../../cards/${cardKey}.jpg')` }}
                />
                <div className="card card-back" />
            </div>
        </div>
    )
}