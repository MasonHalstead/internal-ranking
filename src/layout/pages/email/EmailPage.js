import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  loginUser as loginUserAction,
  setLoading as setLoadingAction,
} from 'ducks/actions';
import { Button } from 'components/buttons/Button';
import { getPublic } from 'utils/axios';
import cn from './EmailPage.module.scss';
const { PUBLIC_URL } = process.env;

export class PasswordPage extends Component {
  static propTypes = {
    loginUser: PropTypes.func,
    setLoading: PropTypes.func,
    match: PropTypes.object,
  };

  state = {
    error: '',
  };

  handleSubmit = async () => {
    const { setLoading, loginUser, match } = this.props;
    const { verify } = match.params;
    setLoading(true);
    try {
      const res = await getPublic(`/users/email/${verify}`);
      loginUser(res.data);
    } catch (err) {
      this.setState({
        error: 'Error verifying email address.',
      });
    }
    setLoading(false);
  };

  render() {
    const { error } = this.state;
    return (
      <div className={cn.page}>
        <div className={cn.loginBlock}>
          <div className={cn.accountBlock}>
            <img
              src={`${PUBLIC_URL}/skydax-dark.png`}
              alt="Skydax Moon Base"
              width={90}
            />
            <div className={cn.accountForm}>
              <h2>Email Verification</h2>
              <p className={cn.terms}>
                Email address has been verified. Please click on the button
                below to confirm your email address.
              </p>
              {error && <p className={cn.error}>{error}</p>}
            </div>
            <div className={cn.flex} />
            <Button
              onClick={this.handleSubmit}
              variant="secondary"
              margin="10px 0px 0px 0px"
            >
              Verify Email Address
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  loginUser: loginUserAction,
  setLoading: setLoadingAction,
};

export default connect(null, mapDispatchToProps)(PasswordPage);
