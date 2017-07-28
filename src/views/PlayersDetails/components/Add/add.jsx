import React from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import styles from './add.css';

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
      <section className={styles.container}>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <TextField
            type="text"
            name="add"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <RaisedButton type="submit" label="add player" secondary={true}/>
        </form>
      </section>
    );
  }
}

Add.propTypes = {
  handleAdd: PropTypes.func.isRequired,
};
