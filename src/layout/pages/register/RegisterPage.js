import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  loginUser as loginUserAction,
  setLoading as setLoadingAction,
} from 'ducks/actions';
import { Input } from 'components/inputs/Input';
import { Button } from 'components/buttons/Button';
import { postPublic } from 'utils/axios';
import cn from './RegisterPage.module.scss';
const { PUBLIC_URL } = process.env;

export class RegisterPage extends Component {
  static propTypes = {
    loginUser: PropTypes.func,
    setLoading: PropTypes.func,
  };

  state = {
    first_name: '',
    last_name: '',
    email_address: '',
    password: '',
    error: '',
  };

  handleFirstName = input => {
    this.setState({ first_name: input.value }, () =>
      this.setState({ error: '' }),
    );
  };

  handleLastName = input => {
    this.setState({ last_name: input.value }, () =>
      this.setState({ error: '' }),
    );
  };

  handlePassword = input => {
    this.setState({ password: input.value }, () =>
      this.setState({ error: '' }),
    );
  };

  handleEmailAddress = input => {
    this.setState({ email_address: input.value }, () =>
      this.setState({ error: '' }),
    );
  };

  handleSubmit = async () => {
    const { setLoading, loginUser } = this.props;
    const { first_name, last_name, email_address, password } = this.state;
    const data = {
      first_name,
      last_name,
      email_address,
      password,
    };
    setLoading(true);
    try {
      const res = await postPublic('/users/register', data);
      loginUser(res.data);
    } catch (err) {
      this.setState({
        error:
          'Error registering new user. Please verify your email address is correct and hasnt already been registered.',
      });
    }
    setLoading(false);
  };

  render() {
    const {
      first_name,
      last_name,
      email_address,
      password,
      error,
    } = this.state;
    return (
      <div className={cn.page}>
        <div className={cn.loginBlock}>
          <img
            src={`${PUBLIC_URL}/forest.jpg`}
            alt="Skydax Moon Base"
            height={500}
          />
          <div className={cn.accountBlock}>
            <img
              src={`${PUBLIC_URL}/skydax-purple.png`}
              alt="Skydax Moon Base"
              width={90}
            />
            <div className={cn.accountForm}>
              <h2>Account Registration</h2>
              <Input
                label="First Name"
                margin="10px 0px"
                value={first_name}
                handleOnChange={this.handleFirstName}
              />
              <Input
                label="Last Name"
                margin="10px 0px"
                value={last_name}
                handleOnChange={this.handleLastName}
              />
              <Input
                label="Email Address"
                margin="10px 0px"
                value={email_address}
                handleOnChange={this.handleEmailAddress}
              />
              <Input
                label="Password"
                type="password"
                margin="10px 0px"
                value={password}
                handleOnChange={this.handlePassword}
              />
              {!error && (
                <p className={cn.terms}>
                  By using Skydax as a service you agree to our privacy policy
                  and terms of service
                </p>
              )}
              {error && <p className={cn.error}>{error}</p>}
            </div>
            <div className={cn.flex} />
            <Button onClick={this.handleSubmit}>Register</Button>
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

export default connect(null, mapDispatchToProps)(RegisterPage);
