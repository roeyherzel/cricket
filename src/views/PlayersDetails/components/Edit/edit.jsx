import React from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Toggle from 'material-ui/Toggle';
import SVGIconRemove from 'material-ui/svg-icons/action/delete';

import styles from './edit.css';

export default class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.toggleEdit   = this.toggleEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSave   = this.handleSave.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.state = {
      value: this.props.name,
      disabled: true,
    };
  }

  toggleEdit() {
    this.setState(prevState => {
      const disabled = !prevState.disabled;
      if (disabled === true) this.handleSave();
      return {disabled};
    });
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  handleSave() {
    this.props.updatePlayer(this.props.id, this.state.value);
  }

  handleRemove() {
    this.props.removePlayer(this.props.id);
  }

  render() {
    return (
      <div className={styles.container}>
        <Toggle className={styles.toggleEdit} onToggle={this.toggleEdit} />
        <TextField
          className={styles.textField}
          name="edit"
          value={this.state.value}
          onChange={this.handleChange}
          disabled={this.state.disabled}
          fullWidth={true}
        />
        {
          (!this.state.disabled) && (
            <IconButton className={styles.removeBtn} onClick={this.handleRemove}>
              <SVGIconRemove />
            </IconButton>
          )
        }
      </div>
    );
  }

}

Edit.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  updatePlayer: PropTypes.func.isRequired,
  removePlayer: PropTypes.func.isRequired,
};
