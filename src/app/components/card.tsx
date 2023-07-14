import { useState } from 'react';
import './card.scss';

export default function Card(params: { cardKey: string, selectCard: Function, avoidSpin?: boolean }) {
    const [spinIt, setSpinIt] = useState(false);
    const cardKey = params.cardKey;
    const avoidSpin = params.avoidSpin;
    let touchStartY: number | undefined;

    const onClick = () => {
        params.selectCard(cardKey);
        if (!avoidSpin) {
            setSpinIt(true);
            setTimeout(() => {
                setSpinIt(false);
            }, 1000);
        }
    }

    const onTouchMove = (e: any) => {
        if (!touchStartY) {
            touchStartY = e.touches[0].clientY;
            return;
        }
        const touchCurrentY = e.touches[0].clientY;
        document.documentElement.scrollTop = document.documentElement.scrollTop + (touchStartY - touchCurrentY) * 2;
        touchStartY = e.touches[0].clientY;
    }

    const onTouchEnd = (e: any) => {
        touchStartY = undefined;
    }

    return (
        <div className={`card-container ${spinIt ? 'spin' : ''}`} onClick={onClick} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
            <div className="flipper">
                <div
                    className={`card card-front`}
                    style={!avoidSpin
                        ? { backgroundImage: `url('../../cards/${cardKey}_sq.webp')` }
                        : { backgroundImage: `url('../../cards/${cardKey}.jpg')` }
                    }
                />
                <div className="card card-back" />
            </div>
        </div>
    )
}