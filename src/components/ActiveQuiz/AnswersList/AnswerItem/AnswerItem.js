import React from 'react'
import styles from './AnswerItem.module.css'

const AnswerItem = props => {
  return (
    <li className={styles.AnswerItem}>
      {props.answer.text}
    </li>
  )
};

export default AnswerItem;