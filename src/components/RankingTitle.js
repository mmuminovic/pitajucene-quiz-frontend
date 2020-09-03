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
            <div className="mt-2">
                <span className="mr-2">
                    <Button
                        type={selected === 0 ? 'submit active' : 'classic'}
                        onClick={() => select(0)}
                    >
                        {currentPeriod}
                    </Button>
                </span>
                <span className="mr-2">
                    <Button
                        type={selected === 1 ? 'submit active' : 'classic'}
                        onClick={() => select(1)}
                    >
                        {lastPeriod}
                    </Button>
                </span>
                <span>
                    <Button
                        type={selected === 2 ? 'submit active' : 'classic'}
                        onClick={() => select(2)}
                    >
                        Najbolji do sad
                    </Button>
                </span>
            </div>
        </div>
    )
}
