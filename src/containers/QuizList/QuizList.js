import React, { Component } from 'react'
import styles from './QuizList.module.css'
import { NavLink } from 'react-router-dom'

export default class QuizList extends Component {
    renderQuizzes () {
        return [1, 2, 3].map((quiz, index) => {
            return (
              <li key={index}>
                  <NavLink to={`/quiz/${quiz}`}>
                    Quiz number {quiz}
                  </NavLink>
              </li>
            )
        })
    };

    render () {
        return (
            <div className={styles.QuizList}>
                <div>
                    <h1>List of Quizzes</h1>
                    <ul>
                        { this.renderQuizzes() }
                    </ul>
                </div>
            </div>
        )
    }
}