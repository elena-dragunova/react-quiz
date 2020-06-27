import React, {Component} from 'react'
import styles from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'

class Quiz extends Component {
  state = {
    quiz: [
      {
        answers: [
          {
            text: 'Question 1',
          },
          {
            text: 'Question 2',
          },
          {
            text: 'Question 3',
          },
          {
            text: 'Question 4',
          },
        ]
      }
    ]
  };

  render () {
    return (
      <div className={styles.Quiz}>
        <h1>Answer the Questions</h1>

        <div className={styles.QuizWrapper}>
          <ActiveQuiz answers={this.state.quiz[0].answers}/>
        </div>
      </div>
    )
  }
}

export default Quiz