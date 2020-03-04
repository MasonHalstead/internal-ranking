import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { emailUser as emailUserProps } from 'ducks/operators/user';
import { handleApiError as handleApiErrorProps } from 'ducks/operators/settings';
import { setModal as setModalAction, setLoading as setLoadingAction } from 'ducks/actions';
import { Input } from 'components/inputs/Input';
import { Modal } from 'components/modals/Modal';
import { Button } from 'components/buttons/Button';
import cn from './Modals.module.scss';
const { PUBLIC_URL } = process.env;

class ConnectedUserReset extends PureComponent {
  static propTypes = {
    setModal: PropTypes.func,
    handleApiError: PropTypes.func,
    setLoading: PropTypes.func,
    emailUser: PropTypes.func,
    user_reset: PropTypes.bool,
  };

  state = {
    email_address: '',
  };

  handleEmailAddress = input => {
    this.setState({ email_address: input.value });
  };

  handleSubmit = async () => {
    const { setLoading, emailUser, handleApiError } = this.props;
    const { email_address, password } = this.state;

    const data = {
      email_address,
      password,
    };

    try {
      await emailUser(data);
      this.handleModalClose();
    } catch (err) {
      handleApiError(err);
    }
    setLoading(false);
  };

  handleModalClose = () => {
    const { setModal } = this.props;
    this.setState({ email_address: '' });
    setModal({ user_reset: false });
  };

  render() {
    const { user_reset } = this.props;
    const { email_address } = this.state;
    return (
      <Modal show={user_reset} width={400} handleClose={this.handleModalClose}>
        <div className={cn.userModal}>
          <img
            className={cn.userImage}
            src={`${PUBLIC_URL}/logo.svg`}
            alt="Internal Ranking Logo"
            width={80}
          />
          <p>Reset password instructions will be sent to your email address if an account is found.</p>
          <Input
            label="Email Address"
            value={email_address}
            margin="0px 0px 0px 0px"
            handleOnChange={this.handleEmailAddress}
          />
          <Button margin="20px 0px 0px 0px">Send Reset Email</Button>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  user_reset: state.modals.user_reset,
});

const mapDispatchToProps = {
  handleApiError: handleApiErrorProps,
  setModal: setModalAction,
  emailUser: emailUserProps,
  setLoading: setLoadingAction,
};

export const UserReset = connect(mapStateToProps, mapDispatchToProps)(ConnectedUserReset);
