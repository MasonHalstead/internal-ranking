import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginUser as loginUserProps } from 'ducks/operators/user';
import { handleApiError as handleApiErrorProps } from 'ducks/operators/settings';
import { setModal as setModalAction, setLoading as setLoadingAction } from 'ducks/actions';
import { Input } from 'components/inputs/Input';
import { Modal } from 'components/modals/Modal';
import { Button } from 'components/buttons/Button';
import cn from './Modals.module.scss';
const { PUBLIC_URL } = process.env;

class ConnectedUserLogin extends PureComponent {
  static propTypes = {
    setModal: PropTypes.func,
    handleApiError: PropTypes.func,
    setLoading: PropTypes.func,
    loginUser: PropTypes.func,
    user_login: PropTypes.bool,
  };

  state = {
    email_address: '',
    password: '',
  };

  handleEmailAddress = input => {
    this.setState({ email_address: input.value });
  };

  handlePassword = input => {
    this.setState({ password: input.value });
  };

  handleSubmit = async () => {
    const { setLoading, loginUser, setModal, handleApiError } = this.props;
    const { email_address, password } = this.state;

    const data = {
      email_address,
      password,
    };

    try {
      await loginUser(data);
      this.handleModalClose();
    } catch (err) {
      await setModal({ user_login: false });
      handleApiError(err);
    }
    setLoading(false);
  };

  handleModalClose = () => {
    const { setModal } = this.props;
    this.setState({ email_address: '', password: '' });
    setModal({ user_login: false });
  };

  render() {
    const { user_login, setModal } = this.props;
    const { email_address, password } = this.state;
    return (
      <Modal show={user_login} width={400} handleClose={this.handleModalClose}>
        <div className={cn.userModal}>
          <img
            className={cn.userImage}
            src={`${PUBLIC_URL}/logo.svg`}
            alt="Internal Ranking Logo"
            width={80}
          />
          <Input
            label="Email Address"
            value={email_address}
            margin="10px 0px 0px 0px"
            handleOnChange={this.handleEmailAddress}
          />
          <Input
            label="Password"
            type="password"
            value={password}
            margin="10px 0px 0px 0px"
            handleOnChange={this.handlePassword}
          />
          <p
            className={cn.link}
            role="presentation"
            onClick={() => setModal({ user_login: false, user_reset: true })}
          >
            Forgot Password?
          </p>
          <Button margin="10px 0px 0px 0px" onClick={this.handleSubmit}>
            Account Login
          </Button>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  user_login: state.modals.user_login,
});

const mapDispatchToProps = {
  handleApiError: handleApiErrorProps,
  setModal: setModalAction,
  loginUser: loginUserProps,
  setLoading: setLoadingAction,
};

export const UserLogin = connect(mapStateToProps, mapDispatchToProps)(ConnectedUserLogin);
