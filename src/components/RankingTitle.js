import React from 'react'
import Button from '../components/Button'

export default function RankingTitle({
    currentPeriod,
    lastPeriod,
    select,
    selected,
}) {
    return (
        <div className="ranking-title">
            <div>Rang lista</div>
            <div className="ranking-title__buttons">
                <span className="mr-2">
                    <Button
                        type={selected === 0 ? 'submit active' : 'classic'}
                        onClick={() => select(0)}
                        disabled={!currentPeriod}
                    >
                        {currentPeriod || 'Trenutno'}
                    </Button>
                </span>
                <span className="mr-2">
                    <Button
                        type={selected === 1 ? 'submit active' : 'classic'}
                        onClick={() => select(1)}
                        disabled={!currentPeriod}
                    >
                        {lastPeriod || 'Prethodni period'}
                    </Button>
                </span>
                <span>
                    <Button
                        type={selected === 2 ? 'submit active' : 'classic'}
                        onClick={() => select(2)}
                        disabled={!currentPeriod}
                    >
                        Najbolji do sad
                    </Button>
                </span>
            </div>
        </div>
    )
}
