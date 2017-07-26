import React from 'react';
import PropTypes from 'prop-types';

import styles from './addPlayer.css';

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
    this.props.handleAdd(this.state.value);
    this.setState({value: ''});
  }

  render() {
    return (
      <form className={styles.container} onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <button type="submit">Add</button>
      </form>
    );
  }
}

Add.propTypes = {
  handleAdd: PropTypes.func.isRequired,
};
