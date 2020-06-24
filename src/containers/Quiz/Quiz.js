import React, {Component} from 'react'
import styles from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'

class Quiz extends Component {
  state = {
    quiz: []
  };

  render () {
    return (
      <div className={styles.Quiz}>
        <h1>Quiz</h1>

        <div className={styles.QuizWrapper}>
          <ActiveQuiz />
        </div>
      </div>
    )
  }
}

export default Quiz