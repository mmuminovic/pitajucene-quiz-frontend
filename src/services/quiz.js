import axios from 'axios'

export const startQuiz = () =>
    new Promise(async (resolve, reject) => {
        try {
            const quiz = await axios.post('/quiz/start', {})
            resolve(quiz.data)
        } catch (error) {
            reject(error)
        }
    })

export const submitAnswer = (id, answer) =>
    new Promise(async (resolve, reject) => {
        try {
            const data = await axios.post(`/quiz/${id}`, { answer })
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
