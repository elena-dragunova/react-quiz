import React from 'react'
import styles from './FinishedQuiz.module.css'
import Button from '../UI/Button/Button'
import { Link } from 'react-router-dom'

const FinishedQuiz = props => {

  const successCount = Object.keys(props.results).reduce((total, key) => {
    console.log(props.results)
    if (props.results[key] === 'success') {
      total += 1;
    }

    return total;
  }, 0);

  return (
    <div className={styles.FinishedQuiz}>
      <ul>
        { props.quiz.map((quizItem, index) => {
          const classes = [
            'fa',
            props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
            styles[props.results[quizItem.id]]
          ];
          return (
            <li key={index}>
              <strong>{index + 1}.</strong>&nbsp;
              {quizItem.question}
              <i className={classes.join(' ')}/>
            </li>
          )
        }) }
      </ul>
      <p>Right answers: {successCount} of {props.quiz.length}.</p>
      <div>
        <Button
          type='primary'
          onClick={props.onRetry}
        >
          Repeat
        </Button>

        <Link to={'/'}>
          <Button type='success'>
            Go to Quizzes List
          </Button>
        </Link>
      </div>
    </div>
  )
};

export default FinishedQuiz