import React, {Component} from 'react'
import styles from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'

class Quiz extends Component {
  state = {
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    quiz: [
      {
        id: 1,
        question: 'What color is the sky?',
        rightAnswerId: 3,
        answers: [
          {
            id: 1,
            text: 'Red',
          },
          {
            id: 2,
            text: 'Black',
          },
          {
            id: 3,
            text: 'Blue',
          },
          {
            id:4,
            text: 'Green',
          },
        ]
      },
      {
        id: 2,
        question: 'What year St.Petersburg was built?',
        rightAnswerId: 4,
        answers: [
          {
            id: 1,
            text: '1700',
          },
          {
            id: 2,
            text: '1705',
          },
          {
            id: 3,
            text: '1702',
          },
          {
            id:4,
            text: '1703',
          },
          {
            id:5,
            text: '1803',
          },
        ]
      }
    ]
  };

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length;
  }

  onAnswerClickHandler = answerId => {
    if (this.state.answerState) {
      const keys = Object.keys(this.state.answerState);
      const key = keys[0];
      if (this.state.answerState[key] === 'success') {
        return
      }
    }

    const question = this.state.quiz[this.state.activeQuestion];
    const results = this.state.results;

    if (question.rightAnswerId === answerId) {
      if(!results[question.id]) {
        results[question.id] = 'success';
        this.setState({
          results,
        })
      }

      this.setState({
        answerState: {[answerId]: 'success',}
      });

      const timeout = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({
            isFinished: true,
          })
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null,
          })
        }
        window.clearTimeout(timeout);
      }, 1000);

    } else {
      results[question.id] = 'error';
      this.setState({
        answerState: {[answerId]: 'error',},
        results,
      })
    }
  };

  retryHandler = () => {
    this.setState({
      results: {},
      isFinished: false,
      activeQuestion: 0,
      answerState: null,
    })
  };

  componentDidMount() {
    console.log(`Quiz ID = ${this.props.match.params.id}`);
  }

  render () {
    return (
      <div className={styles.Quiz}>
        <h1>Answer the Questions</h1>

        {
          this.state.isFinished
          ? <FinishedQuiz
              results={this.state.results}
              quiz={this.state.quiz}
              onRetry={this.retryHandler}
            />
            : <div className={styles.QuizWrapper}>
              <ActiveQuiz
                answers={this.state.quiz[this.state.activeQuestion].answers}
                question={this.state.quiz[this.state.activeQuestion].question}
                quizLength={this.state.quiz.length}
                answerNumber={this.state.activeQuestion + 1}
                state={this.state.answerState}
                onAnswerClick={this.onAnswerClickHandler}
              />
            </div>
        }
      </div>
    )
  }
}

export default Quiz