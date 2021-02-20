import React from 'react';
import { AccessAlarm as Time, Star } from '@material-ui/icons';

const RankingItem = ({ place, name, score, time, onClick }) => {
  return (
    <div className="ranking-item" onClick={onClick}>
      <div>
        {place && `${place}. `}
        {name}
      </div>
      <div className="ranking-item__scores">
        <div className="d-flex justify-content-center align-items-center">
          <Star className="ranking-item__scores--icon icon-star" />
          <span>{score}</span>
        </div>
        <div className="d-flex justify-content-center align-items-center" style={{ width: '90px' }}>
          <Time className="ranking-item__scores--icon icon-time" />
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
};

export default RankingItem;
