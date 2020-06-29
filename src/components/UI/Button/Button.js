import React from 'react'
import styles from './Button.module.css'

const Button = props => {
  const classes = [
    styles.Button,
    styles[props.type]
  ];

  return (
    <button
      className={classes.join(' ')}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
};

export default Button