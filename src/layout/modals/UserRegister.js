import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { registerUser as registerUserProps } from 'ducks/operators/user';
import { handleApiError as handleApiErrorProps } from 'ducks/operators/settings';
import { setModal as setModalAction, setLoading as setLoadingAction } from 'ducks/actions';
import { Input } from 'components/inputs/Input';
import { Modal } from 'components/modals/Modal';
import { Button } from 'components/buttons/Button';
import cn from './Modals.module.scss';
const { PUBLIC_URL } = process.env;

class ConnectedUserRegister extends PureComponent {
  static propTypes = {
    setModal: PropTypes.func,
    handleApiError: PropTypes.func,
    setLoading: PropTypes.func,
    registerUser: PropTypes.func,
    user_register: PropTypes.bool,
  };

  state = {
    first_name: '',
    last_name: '',
    email_address: '',
    organization_code: '',
    password: '',
    confirm_password: '',
    email_valid: true,
    password_valid: true,
  };

  handleFirstName = input => {
    this.setState({ first_name: input.value });
  };

  handleLastName = input => {
    this.setState({ last_name: input.value });
  };

  handleOrganizationCode = input => {
    this.setState({ organization_code: input.value });
  };

  handlePassword = input => {
    this.setState({ password: input.value }, () => this.passwordValidation());
  };

  handleConfirmPassword = input => {
    this.setState({ confirm_password: input.value }, () => this.passwordValidation());
  };

  handleEmailAddress = input => {
    this.setState({ email_address: input.value, email_valid: this.emailValidation(input.value) });
  };

  emailValidation = email_address => {
    if (email_address.length > 0) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email_address);
    }
    return true;
  };

  passwordValidation = () => {
    const { password, confirm_password } = this.state;
    if (password.length === 0 && confirm_password.length === 0) {
      return this.setState({ password_valid: true });
    }
    if (password === confirm_password) {
      return this.setState({ password_valid: true });
    }
    return this.setState({ password_valid: false });
  };

  handleSubmit = async () => {
    const { setLoading, registerUser, setModal, handleApiError } = this.props;
    const {
      first_name,
      last_name,
      email_address,
      organization_code,
      password,
      confirm_password,
      password_valid,
      email_valid,
    } = this.state;

    const data = {
      first_name,
      last_name,
      email_address,
      organization_code,
      password,
      confirm_password,
    };
    try {
      if (!email_valid) {
        throw Error('Email Address must be valid');
      }
      if (!password_valid) {
        throw Error('Confirm Password must match Password');
      }
      if (data.password.length < 5) {
        throw Error('Password must be at least 5 characters');
      }
      await registerUser(data);
      this.handleModalClose();
    } catch (err) {
      await setModal({ user_register: false });
      handleApiError(err);
    }
    setLoading(false);
  };

  handleModalClose = () => {
    const { setModal } = this.props;
    this.setState({
      first_name: '',
      last_name: '',
      email_address: '',
      organization_code: '',
      password: '',
      confirm_password: '',
    });
    setModal({ user_register: false });
  };

  render() {
    const { user_register } = this.props;
    const {
      first_name,
      last_name,
      email_address,
      organization_code,
      confirm_password,
      email_valid,
      password_valid,
      password,
    } = this.state;
    return (
      <Modal show={user_register} width={400} handleClose={this.handleModalClose}>
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
          <Input
            label="Email Address"
            value={email_address}
            margin="10px 0px 0px 0px"
            error={!email_valid}
            handleOnChange={this.handleEmailAddress}
          />
          <Input
            label="Organization Code"
            value={organization_code}
            margin="10px 0px 0px 0px"
            handleOnChange={this.handleOrganizationCode}
          />
          <Input
            label="Password"
            type="password"
            value={password}
            margin="10px 0px 0px 0px"
            handleOnChange={this.handlePassword}
          />
          <Input
            label="Confirm Password"
            type="password"
            value={confirm_password}
            margin="10px 0px 0px 0px"
            error={!password_valid}
            handleOnChange={this.handleConfirmPassword}
          />
          <Button margin="20px 0px 0px 0px" onClick={this.handleSubmit}>
            Register Account
          </Button>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  user_register: state.modals.user_register,
});

const mapDispatchToProps = {
  handleApiError: handleApiErrorProps,
  setModal: setModalAction,
  registerUser: registerUserProps,
  setLoading: setLoadingAction,
};

export const UserRegister = connect(mapStateToProps, mapDispatchToProps)(ConnectedUserRegister);
