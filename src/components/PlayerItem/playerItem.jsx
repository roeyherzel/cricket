import React from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import SVGIconDelete from 'material-ui/svg-icons/action/delete';
import SVGIconDone from 'material-ui/svg-icons/action/done';
import SVGIconEdit from 'material-ui/svg-icons/editor/mode-edit';

import styles from './playerItem.css';

class PlayerItem extends React.Component {

  static propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    handleEdit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
  }

  state = {
    name: this.props.name,
    editMode: false,
    errorMsg: '',
  };

  handleInputChange = e => {
    this.setState({name: e.target.value});
  }

  handleEditMode = () => {
    this.setState({editMode: true});
  }

  handleDone = () => {
    const errorMsg = this.props.handleEdit(this.props.id, this.state.name);
    if (errorMsg) {
      this.setState({ errorMsg });
    } else {
      this.setState({ editMode: false, errorMsg: '' });
    }
  }

  handleDelete = () => {
    this.props.handleDelete(this.props.id);
  }

  render() {
    return (
      <div className={styles.container}>
        <IconButton onClick={this.handleDelete}>
          <SVGIconDelete />
        </IconButton>

        <TextField
          name="edit"
          value={this.state.name}
          onChange={this.handleInputChange}
          errorText={this.state.errorMsg}
          disabled={!this.state.editMode}
          floatingLabelText={this.state.editMode && 'Edit'}
        />
        {
          (this.state.editMode) ? (
            <IconButton onClick={this.handleDone}>
              <SVGIconDone />
            </IconButton>
          ) : (
            <IconButton onClick={this.handleEditMode}>
              <SVGIconEdit />
            </IconButton>
          )
        }
      </div>
    );
  }

}

export default PlayerItem;
