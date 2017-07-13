import React from 'react';
import PropTypes from 'prop-types';

export default class Edit extends React.Component {
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
      <form>
        <input
          type="text"
          value={this.state.value}
          disabled={this.state.disabled}
          onChange={this.handleChange}
        />
        {
          (this.state.disabled) ? (
            <button type="button" onClick={this.handleEdit}>Edit</button>
          ) : (
            <button type="button" onClick={this.handleSave}>Save</button>
          )
        }
        <button type="button" onClick={this.handleRemove}>X</button>
      </form>
    );
  }
}

Edit.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  updatePlayer: PropTypes.func.isRequired,
  removePlayer: PropTypes.func.isRequired,
};