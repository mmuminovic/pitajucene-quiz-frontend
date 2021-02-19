import axios from 'axios';

export const getQuestions = () =>
  new Promise(async (resolve, reject) => {
    try {
      const questions = await axios.get('/question/get-questions');
      resolve(questions.data);
    } catch (error) {
      reject(error);
    }
  });

export const addQuestion = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const question = await axios.post(`/question/add-question`, data);
      resolve(question.data);
    } catch (error) {
      reject(error);
    }
  });

export const editQuestion = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const question = await axios.patch(`/question/edit-question/${data.id}`, data);
      resolve(question.data);
    } catch (error) {
      reject(error);
    }
  });
