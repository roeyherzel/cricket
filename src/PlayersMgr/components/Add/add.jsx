import styles from './add.css';

import React from 'react';
import PropTypes from 'prop-types';

export default class Add extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {value: ''};
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.addPlayer(this.state.value);
    this.setState({value: ''});
  }

  render() {
    return (
      <form className={styles.form} onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <button type="submit">+</button>
      </form>
    );
  }
}

Add.propTypes = {
  addPlayer: PropTypes.func.isRequired,
};
