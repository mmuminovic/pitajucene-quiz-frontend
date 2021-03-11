import axios from 'axios';


export const getStats = (month) =>
  new Promise(async (resolve, reject) => {
    try {
      const quiz = await axios.get(`stats/get-stats?=${month}`, { 
        headers: {
          'Authorization': `${process.env.REACT_APP_ADMIN_HEADER}`
        }
      });
      resolve(quiz);
    } catch (error) {
      reject(error);
    }
  });

export const rankingLists = () =>
  new Promise(async (resolve, reject) => {
    try {
      const data = await axios.get('/stats/ranking-lists');
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });

export const homeStats = () =>
  new Promise(async (resolve, reject) => {
    try {
      const data = await axios.get('/stats/home');
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });

export const getScores = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const data = await axios.get(`/stats/scores/${id}`);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });

