import axios from 'axios';

export const getQuestions = ({ sortBy }) =>
  new Promise(async (resolve, reject) => {
    try {
      const questions = await axios.get(`/question/get-questions?sortBy=${sortBy}`);
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

export const deleteQuestion = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const question = await axios.delete(`/question/delete/${id}`);
      resolve(question.data);
    } catch (error) {
      reject(error);
    }
  });
