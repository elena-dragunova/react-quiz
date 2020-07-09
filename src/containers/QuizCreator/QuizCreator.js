import React, { Component } from 'react'
import styles from './QuizCreator.module.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import Select from '../../components/UI/Select/Select'
import {createControl, validate, validateForm} from '../../form/formFramework'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import axios from '../../axios/axios-quiz'

function createOptionControl (optionNum) {
    return createControl({
        label: `Option ${optionNum}`,
        errorMessage: `Please, enter option ${optionNum}`,
        id: optionNum,
    }, {required: true})
}

function createFormControls () {
    return {
        question: createControl({
            label: 'Enter your question',
            errorMessage: 'Please, enter your question'
        }, {required: true}),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4),
    }
}

export default class QuizCreator extends Component {

    state = {
        quiz: [],
        isFormValid: false,
        rightAnswerId: 1,
        formControls: createFormControls(),
    };

    submitHandler = e => {
        e.preventDefault();
    };

    addQuestionHandler = (e) => {
        e.preventDefault();

        const quiz = [...this.state.quiz];
        const index = quiz.length + 1;

        const {question, option1, option2, option3, option4} = this.state.formControls;

        const questionItem = {
            question: question.value,
            id: index,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                {
                    text: option1.value,
                    id: option1.id,
                },
                {
                    text: option2.value,
                    id: option2.id,
                },
                {
                    text: option3.value,
                    id: option3.id,
                },
                {
                    text: option4.value,
                    id: option4.id,
                },
            ]
        };

        quiz.push(questionItem);

        this.setState({
            quiz,
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls(),
        })
    };

    createQuizHandler = async e => {
        e.preventDefault();

        try {
            await axios.post('/quizzes.json', this.state.quiz)
            this.setState({
                quiz: [],
                isFormValid: false,
                rightAnswerId: 1,
                formControls: createFormControls(),
            })
        } catch (e) {
            console.log(e)
        }
    };

    changeHandler = (value, controlName) => {
        const formControls = {...this.state.formControls};
        const control = {...formControls[controlName]};
        control.touched = true;
        control.value = value;
        control.valid = validate(control.value, control.validation);

        formControls[controlName] = control;

        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        });
    };

    selectChangeHandler = e => {
        this.setState({
            rightAnswerId: +e.target.value
        });
    };

    renderInputs () {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];

            return (
              <Auxiliary key={controlName + index}>
                  <Input
                    label={control.label}
                    value={control.value}
                    valid={control.valid}
                    shouldValidate={!!control.validation}
                    touched={control.touched}
                    errorMessage={control.errorMessage}
                    onChange={e => this.changeHandler(e.target.value, controlName)}
                  />

                  { index === 0 ? <hr /> : null }
              </Auxiliary>
            )
        })
    }

    render () {
        const select = <Select
            label = 'Choose the right answer'
            value = {this.state.rightAnswerId}
            onChange={this.selectChangeHandler}
            options={[
                {text: '1', value: 1},
                {text: '2', value: 2},
                {text: '3', value: 3},
                {text: '4', value: 4},
            ]}
        />;

        return (
            <div className={styles.QuizCreator}>
              <div>
                  <h1>Quiz Creation</h1>
                  <form onSubmit={this.submitHandler}>

                      { this.renderInputs() }

                      { select }
                      <Button
                        type="primary"
                        disabled={!this.state.isFormValid}
                        onClick={this.addQuestionHandler}>Add a question
                      </Button>
                      <Button
                        type="success"
                        disabled={this.state.quiz.length === 0}
                        onClick={this.createQuizHandler}>Create Quiz
                      </Button>
                  </form>
              </div>
            </div>
        )
    }
}