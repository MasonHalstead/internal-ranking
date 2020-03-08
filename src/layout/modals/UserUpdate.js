import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateUser as updateUserProps, getUserToken as getUserTokenProps } from 'ducks/operators/user';
import { handleApiError as handleApiErrorProps } from 'ducks/operators/settings';
import { setModal as setModalAction, setLoading as setLoadingAction } from 'ducks/actions';
import { Input } from 'components/inputs/Input';
import { Modal } from 'components/modals/Modal';
import { Button } from 'components/buttons/Button';
import cn from './Modals.module.scss';
const { PUBLIC_URL } = process.env;

class ConnectedUserUpdate extends PureComponent {
  static propTypes = {
    setModal: PropTypes.func,
    handleApiError: PropTypes.func,
    setLoading: PropTypes.func,
    updateUser: PropTypes.func,
    getUserToken: PropTypes.func,
    user: PropTypes.object,
    user_update: PropTypes.bool,
  };

  state = {
    first_name: '',
    last_name: '',
    updated_at: '',
  };

  static getDerivedStateFromProps(props, state) {
    const { updated_at } = state;
    const { user } = props;
    if (user.updated_at !== updated_at) {
      return {
        first_name: user.first_name,
        last_name: user.last_name,
        updated_at: user.updated_at,
      };
    }
    return null;
  }

  handleFirstName = input => {
    this.setState({ first_name: input.value });
  };

  handleLastName = input => {
    this.setState({ last_name: input.value });
  };

  handleSubmit = async () => {
    const { setLoading, updateUser, getUserToken, setModal, handleApiError } = this.props;
    const { first_name, last_name } = this.state;

    const data = {
      first_name,
      last_name,
    };
    try {
      await updateUser(data);
      await getUserToken();
      this.handleModalClose();
    } catch (err) {
      await setModal({ user_update: false });
      handleApiError(err);
    }
    setLoading(false);
  };

  handleModalClose = () => {
    const { setModal } = this.props;
    setModal({ user_update: false });
  };

  render() {
    const { user_update } = this.props;
    const { first_name, last_name } = this.state;
    return (
      <Modal show={user_update} width={400} handleClose={this.handleModalClose}>
        <div className={cn.userModal}>
          <img
            className={cn.userImage}
            src={`${PUBLIC_URL}/logo.svg`}
            alt="Internal Ranking Logo"
            width={80}
          />
          <Input
            label="First Name"
            value={first_name}
            margin="10px 0px 0px 0px"
            handleOnChange={this.handleFirstName}
          />
          <Input
            label="Last Name"
            value={last_name}
            margin="10px 0px 0px 0px"
            handleOnChange={this.handleLastName}
          />
          <Button margin="20px 0px 0px 0px" onClick={this.handleSubmit}>
            Update Account
          </Button>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  user_update: state.modals.user_update,
});

const mapDispatchToProps = {
  handleApiError: handleApiErrorProps,
  setModal: setModalAction,
  updateUser: updateUserProps,
  getUserToken: getUserTokenProps,
  setLoading: setLoadingAction,
};

export const UserUpdate = connect(mapStateToProps, mapDispatchToProps)(ConnectedUserUpdate);
