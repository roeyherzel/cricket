import styles from './managePlayer.css';

import React from 'react';
import PropTypes from 'prop-types';

export default class Manage extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleEdit   = this.handleEdit.bind(this);
    this.handleSave   = this.handleSave.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.state = {
      value: this.props.name,
      disabled: true,
    };
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  handleEdit() {
    this.setState({disabled: false});
  }

  handleSave() {
    this.setState({disabled: true});
    this.props.updatePlayer(this.props.id, this.state.value);
  }

  handleRemove() {
    this.props.removePlayer(this.props.id);
  }

  render() {
    return (
      <form className={styles.player}>
        <input
          className={styles.name}
          type="text"
          value={this.state.value}
          disabled={this.state.disabled}
          onChange={this.handleChange}
        />
        {
          (this.state.disabled) ? (
            <button className={styles.edit} type="button" onClick={this.handleEdit}>Edit</button>
          ) : (
            <span className={styles.actions}>
              <button className={styles.save} type="button" onClick={this.handleSave}>V</button>
              <button className={styles.remove} type="button" onClick={this.handleRemove}>X</button>
            </span>
          )
        }
      </form>
    );
  }
}

Manage.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  updatePlayer: PropTypes.func.isRequired,
  removePlayer: PropTypes.func.isRequired,
};
