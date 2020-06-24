import React from 'react'
import styles from './ActiveQuiz.module.css'

const ActiveQuiz = props => (
  <div className={styles.ActiveQuiz}>
    <p className={styles.Question}>
      <span>
        <strong>2.</strong>&nbsp;
        Whats up?
      </span>

      <small>2 of 10</small>
    </p>

    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
    </ul>
  </div>
);

export default ActiveQuiz