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
    closeModal: PropTypes.func,
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
  };

  handleFirstName = input => {
    this.setState({ first_name: input.value });
  };

  handleLastName = input => {
    this.setState({ last_name: input.value });
  };

  handleEmailAddress = input => {
    this.setState({ email_address: input.value });
  };

  handleOrganizationCode = input => {
    this.setState({ organization_code: input.value });
  };

  handleConfirmPassword = input => {
    this.setState({ confirm_password: input.value });
  };

  handlePassword = input => {
    this.setState({ password: input.value });
  };

  handleSubmit = async () => {
    const { setLoading, registerUser, handleApiError } = this.props;
    const {
      first_name,
      last_name,
      email_address,
      organization_code,
      password,
      confirm_password,
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
      await registerUser(data);
      this.handleModalClose();
    } catch (err) {
      handleApiError(err);
    }
    setLoading(false);
  };

  handleModalClose = () => {
    const { closeModal } = this.props;
    this.setState({
      first_name: '',
      last_name: '',
      email_address: '',
      organization_code: '',
      password: '',
      confirm_password: '',
    });
    closeModal({ user_register: false });
  };

  render() {
    const { user_register } = this.props;
    const {
      first_name,
      last_name,
      email_address,
      organization_code,
      confirm_password,
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
            handleOnChange={this.handleConfirmPassword}
          />
          <Button margin="20px 0px 0px 0px">Register Account</Button>
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
  closeModal: setModalAction,
  registerUser: registerUserProps,
  setLoading: setLoadingAction,
};

export const UserRegister = connect(mapStateToProps, mapDispatchToProps)(ConnectedUserRegister);
