import React, {Component} from 'react'
import styles from './Drawer.module.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
import { NavLink } from 'react-router-dom'

class Drawer extends Component {

  clickHandler = () => {
    this.props.onClose();
  };

  renderLinks(links) {
    return links.map((link, index) => {
      return (
        <li
          key={index}
        >
          <NavLink
            to={link.to}
            exact={link.exact}
            activeClassName={styles.active}
            onClick={this.clickHandler}
          >{link.label}</NavLink>
        </li>
      )
    })
  }

  render() {
    const classes = [
      styles.Drawer,
    ];

    if (!this.props.isOpen) {
      classes.push(styles.close);
    }

    const links = [
      {
        to: '/',
        label: 'List of Quizzes',
        exact: true,
      },

    ];

    if (this.props.isAuthenticated) {
      links.push({
        to: '/quiz-creator',
        label: 'Create quiz',
        exact: false,
      });
      links.push({
        to: '/logout',
        label: 'Logout',
        exact: false,
      })
    } else {
      links.push({
        to: '/auth',
        label: 'Authorization',
        exact: false,
      },)
    }

    return (
      <React.Fragment>
        <nav className={classes.join(' ')}>
          <ul>
            {this.renderLinks(links)}
          </ul>
        </nav>
        { this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null }
      </React.Fragment>
    )
  }
}

export default Drawer

