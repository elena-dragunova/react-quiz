import React from 'react'
import styles from './ActiveQuiz.module.css'
import AnswersList from './AnswersList/AnswersList'

const ActiveQuiz = props => (
  <div className={styles.ActiveQuiz}>
    <p className={styles.Question}>
      <span>
        <strong>{props.answerNumber}.</strong>&nbsp;
        {props.question}
      </span>

      <small>{props.answerNumber} of {props.quizLength}</small>
    </p>

    <AnswersList
      answers={props.answers}
      state={props.state}
      onAnswerClick={props.onAnswerClick}
    />
  </div>
);

export default ActiveQuiz