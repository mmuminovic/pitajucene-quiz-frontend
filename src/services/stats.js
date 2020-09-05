import axios from 'axios'

export const getStats = () =>
    new Promise(async (resolve, reject) => {
        try {
            const quiz = await axios.get('/stats/get-stats')
            resolve(quiz)
        } catch (error) {
            reject(error)
        }
    })

export const rankingLists = () =>
    new Promise(async (resolve, reject) => {
        try {
            const data = await axios.get('/stats/ranking-lists')
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })

export const homeStats = () =>
    new Promise(async (resolve, reject) => {
        try {
            const data = await axios.get('/stats/home')
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })

export const myScores = () =>
    new Promise(async (resolve, reject) => {
        try {
            const data = await axios.get('/stats/myscores')
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
