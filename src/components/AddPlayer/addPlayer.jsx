import React from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import SVGIconAdd from 'material-ui/svg-icons/content/add';
import styles from './addPlayer.css';

/*
 * Add Player
 * ----------
 * - controled form component
 * - renders error message if submit fails
 */

export default class AddPlayer extends React.Component {
  static propTypes = {
    onAdd: PropTypes.func.isRequired,
  }

  state = {
    value: '',
    errorMsg: '',
  };

  handleChange = (e) => {
    // control input value
    this.setState({value: e.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onAdd(this.state.value);
  }

  render() {
    return (
      <form className={styles.form} onSubmit={this.handleSubmit}>

        <IconButton className={styles.button} type="submit">
          <SVGIconAdd />
        </IconButton>

        <TextField
          className={styles.input}
          type="text"
          name="add"
          hintText="Add Player"
          value={this.state.value}
          onChange={this.handleChange}
          errorText={this.state.errorMsg}
          underlineShow={true}
          autoComplete="off"
          maxLength="6"
          minLength="1"
        />

      </form>
    );
  }
}
