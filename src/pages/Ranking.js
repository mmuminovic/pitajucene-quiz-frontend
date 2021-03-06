import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import RankingTitle from '../components/RankingTitle';
import RankingItem from '../components/RankingListItem';
import { rankingLists } from '../services/stats';
import Loader from '../components/Spinner';
import Button from '../components/Button';

const ENUM_RANKING = ['currentRankingList', 'rankingLastPeriod', 'top10ranking'];

const Ranking = () => {
  const [selected, select] = useState(0);
  const [currentPeriod, setCurrentPeriod] = useState('');
  const [lastPeriod, setLastPeriod] = useState('');
  const [rankingList, setRankingList] = useState([]);
  const [data, setData] = useState(null);
  const history = useHistory();
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  const { isLoading } = useQuery('ranking', () => rankingLists(), {
    onSuccess: (data) => {
      setData(data);
    },
  });

  useEffect(() => {
    let list = [];
    if (data) {
      const rankingListName = ENUM_RANKING[selected];
      if (data.data[rankingListName].rankingList.length > 0) {
        data.data[rankingListName].rankingList.forEach((item, i) => {
          const listItem = (
            <RankingItem
              key={i}
              place={i + 1}
              name={item.fullName}
              score={item.score}
              time={item.duration}
              onClick={() => {
                if (isAdmin) {
                  history.push('/profile', { id: item.userId });
                }
              }}
            />
          );
          list.push(listItem);
        });
      } else {
        const notification = (
          <p
            style={{
              color: '#fff',
              fontSize: '1.6rem',
              textAlign: 'center',
              marginTop: '2rem',
            }}
          >
            Trenutno nema rezultata
          </p>
        );
        list.push(notification);
      }
      setCurrentPeriod(data.data.currentRankingList.rankingListTitle);
      setLastPeriod(data.data.rankingLastPeriod.rankingListTitle);
    }
    setRankingList(list);
  }, [selected, data, history, isAdmin]);

  return (
    <div className="wrapper">
      {isLoading || !data ? (
        <Loader />
      ) : (
        <div className="ranking">
          <RankingTitle select={select} selected={selected} currentPeriod={currentPeriod} lastPeriod={lastPeriod} />
          <div className="ranking-list">{rankingList}</div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Button
              type="submit active"
              onClick={() => history.push('/')}
              style={{
                marginTop: '1rem',
                fontSize: '1.4rem',
                padding: '1rem 1.6rem',
                borderRadius: '1rem',
              }}
            >
              Vrati se na početnu
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ranking;
