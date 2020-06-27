import React from 'react'
import styles from './ActiveQuiz.module.css'
import AnswersList from './AnswersList/AnswersList'

const ActiveQuiz = props => (
  <div className={styles.ActiveQuiz}>
    <p className={styles.Question}>
      <span>
        <strong>2.</strong>&nbsp;
        Whats up?
      </span>

      <small>2 of 10</small>
    </p>

    <AnswersList answers={props.answers}/>
  </div>
);

export default ActiveQuiz