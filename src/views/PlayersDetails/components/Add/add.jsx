import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import SVGIconAdd from 'material-ui/svg-icons/content/add';
import styles from './add.css';

/*
  Add Player
  ----------
  - controled form component
  - renders error message if submit fails
*/

export default class Add extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      value: '',
      errorMsg: '',
    };
  }

  handleChange(e) {
    // control input value
    this.setState({value: e.target.value});
  }

  handleSubmit(e) {
    // submit form and set error (if returned)
    e.preventDefault();
    const errorMsg = this.props.handleAdd(this.state.value);
    this.setState({value: '', errorMsg});
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
          autoFocus
          maxLength="6"
          minLength="1"
        />

      </form>
    );
  }
}

Add.propTypes = {
  handleAdd: PropTypes.func.isRequired,
};
