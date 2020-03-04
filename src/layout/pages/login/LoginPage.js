import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginUser as loginUserAction, setLoading as setLoadingAction } from 'ducks/actions';
import { Input } from 'components/inputs/Input';
import { Button } from 'components/buttons/Button';
import { postPublic } from 'utils/axios';
import cn from './LoginPage.module.scss';
const { PUBLIC_URL } = process.env;

export class LoginPage extends Component {
  static propTypes = {
    loginUser: PropTypes.func,
    setLoading: PropTypes.func,
  };

  state = {
    email_address: '',
    password: '',
    error: '',
  };

  handlePassword = input => {
    this.setState({ password: input.value }, () => this.setState({ error: '' }));
  };

  handleEmailAddress = input => {
    this.setState({ email_address: input.value }, () => this.setState({ error: '' }));
  };

  handleSubmit = async () => {
    const { setLoading, loginUser } = this.props;
    const { email_address, password } = this.state;
    const data = {
      email_address,
      password,
    };
    setLoading(true);
    try {
      const res = await postPublic('/users/login', data);
      loginUser(res.data);
    } catch (err) {
      this.setState({
        error: 'Error authenticating credentials. Please verify your email address and password are correct.',
      });
    }
    setLoading(false);
  };

  render() {
    const { email_address, password, error } = this.state;
    return (
      <div className={cn.page}>
        <div className={cn.loginBlock}>
          <img src={`${PUBLIC_URL}/moonshot.jpg`} alt="Skydax Moon Base" width={297} height={450} />
          <div className={cn.accountBlock}>
            <img src={`${PUBLIC_URL}/ir-logo.svg`} alt="Skydax Logo" width={90} />
            <div className={cn.accountForm}>
              <h2>Account Login</h2>
              <Input label="Email Address" margin="10px 0px" value={email_address} handleOnChange={this.handleEmailAddress} />
              <Input label="Password" type="password" margin="10px 0px" value={password} handleOnChange={this.handlePassword} />
              <p className={cn.terms}>By using Skydax as a service you agree to our privacy policy and terms of service</p>
              {error && <p className={cn.error}>{error}</p>}
            </div>
            <div className={cn.flex} />
            <Button onClick={this.handleSubmit} variant="secondary">
              Account Login
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

export default connect(null, mapDispatchToProps)(LoginPage);
