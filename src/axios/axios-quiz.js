import axios from 'axios'

export default axios.create({
  baseURL: 'https://react-quiz-75920.firebaseio.com'
})