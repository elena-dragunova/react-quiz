import React, { Component } from 'react'
import styles from './Auth.module.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import is from 'is_js'

export default class Auth extends Component{

  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Please, enter valid email',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true,
        }
      },
      password: {
        value: '',
        type: 'password',
        label: 'Password',
        errorMessage: 'Please, enter valid password',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6,
        }
      },
    }
  };

  validateControl = (value, validation) => {
    if (!validation) {
      return true;
    }

    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== '' && isValid
    }

    if (validation.email) {
      isValid = is.email(value) && isValid
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid
    }

    return isValid;
  };

  onChangeHandler = (e, controlName) => {
    const formControls = {...this.state.formControls};
    const control = {...formControls[controlName]};

    control.value = e.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);

    formControls[controlName] = control;

    let isFormValid = true;

    Object.keys(formControls).forEach((name) => {
      isFormValid = formControls[name].valid && isFormValid
    });

    this.setState({
      isFormValid,
      formControls,
    })
  };

  loginHandler = () => {};
  registerHandler = () => {};

  submitHandler = (e) => {
    e.preventDefault();
  };

  renderInputs = () => {
    const inputs = Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      return (
        <Input
          key={controlName + index}
          type={control.type}
          label={control.label}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={e => this.onChangeHandler(e, controlName)}
        />
      )
    });

    return inputs
  };

  render () {
    return (
      <div className={styles.Auth}>
        <div>
          <h1>Authorization</h1>
          <form
            className={styles.AuthForm}
            onSubmit={this.submitHandler}>
            {this.renderInputs()}
            <Button
              type="success"
              disabled={!this.state.isFormValid}
              onClick={this.loginHandler}
            >Login</Button>
            <Button
              type="primary"
              disabled={!this.state.isFormValid}
              onClick={this.registerHandler}
            >Sign In</Button>
          </form>
        </div>
      </div>
    )
  }
}