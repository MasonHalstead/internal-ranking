import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { handleApiError as handleApiErrorProps } from 'ducks/operators/settings';
import {
  loginUser as loginUserAction,
  setLoading as setLoadingAction,
  setModal as setModalAction,
} from 'ducks/actions';
import { Input } from 'components/inputs/Input';
import { Button } from 'components/buttons/Button';
import { postPublic } from 'utils/axios';
import cn from './RootPage.module.scss';
const { PUBLIC_URL } = process.env;

export class RootPage extends Component {
  static propTypes = {
    loginUser: PropTypes.func,
    setLoading: PropTypes.func,
    setModal: PropTypes.func,
    handleApiError: PropTypes.func,
  };

  state = {
    email_address: '',
    confirm_password: '',
    password: '',
  };

  handlePassword = input => {
    this.setState({ password: input.value });
  };

  handleConfirmPassword = input => {
    this.setState({ confirm_password: input.value });
  };

  handleEmailAddress = input => {
    this.setState({ email_address: input.value });
  };

  handleSubmit = async () => {
    const { setLoading, handleApiError, loginUser } = this.props;
    const { email_address, confirm_password, password } = this.state;
    const data = {
      email_address,
      confirm_password,
      password,
    };
    try {
      const res = await postPublic('/users/login', data);
      await setLoading(false);
      loginUser(res.data);
    } catch (err) {
      handleApiError(err, data);
    }
  };

  render() {
    const { setModal } = this.props;
    const { email_address, confirm_password, password } = this.state;
    const year = new Date().getFullYear();
    return (
      <div className={cn.page}>
        <div className={cn.landingBlock}>
          <div className={cn.landingLeft}>
            <img src={`${PUBLIC_URL}/logo.svg`} alt="Internal Ranking Logo" width={80} />
            <h2>Create an account</h2>
            <p className={cn.text}>
              Our intuitive platform will guide you every step of the way creating a fun and competitive
              environment.
            </p>
            <Input
              label="Email Address"
              margin="5px 0px"
              value={email_address}
              handleOnChange={this.handleEmailAddress}
            />
            <Input
              label="Password"
              type="password"
              margin="5px 0px"
              value={password}
              handleOnChange={this.handlePassword}
            />
            <Input
              label="Confirm Password"
              type="password"
              margin="5px 0px 30px 0px"
              value={confirm_password}
              handleOnChange={this.handleConfirmPassword}
            />
            <Button onClick={this.handleSubmit} variant="secondary">
              Create Account
            </Button>
            <div className={cn.flex} />
            <p className={cn.action}>
              Already have an account?{' '}
              <a onClick={() => setModal({ user_login: true })} role="presentation">
                Login
              </a>
            </p>
          </div>
          <div className={cn.landingRight} style={{ background: `url(${PUBLIC_URL}/background.jpg)` }}>
            <div className={cn.navigation}>
              <a className={cn.action} onClick={() => setModal({ user_register: true })}>
                Register
              </a>
              <a className={cn.action} onClick={() => setModal({ user_login: true })}>
                Login
              </a>
            </div>
            <div className={cn.actionBlock}>
              <h1 className={cn.title}>Online Performance Ranking</h1>
              <p className={cn.subTitle}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>
        <div className={cn.infoBlock}>
          <div className={cn.infoLeft}>
            <h3>Internal Games</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <Button
              onClick={this.handleSubmit}
              width="max-content"
              margin="10px 0px 0px 0px"
              variant="secondary"
            >
              Add Games
            </Button>
          </div>
          <div className={cn.infoRight}>
            <h3>Internal Ranking</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <Button
              onClick={this.handleSubmit}
              width="max-content"
              margin="10px 0px 0px 0px"
              variant="secondary"
            >
              View Rankings
            </Button>
          </div>
        </div>
        <div className={cn.featureBlock}>
          <h3>Internal Features</h3>
          <p className={cn.featureDescription}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className={cn.featureContainer}>
            <div className={cn.featureLeft}>
              <img src={`${PUBLIC_URL}/gaming.svg`} alt="Internal Ranking Logo" width={85} />
              <h3 className={cn.header}>Custom Games</h3>
              <p className={cn.description}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div className={cn.featureCenter}>
              <img src={`${PUBLIC_URL}/leaderboard.svg`} alt="Internal Ranking Logo" width={85} />
              <h3 className={cn.header}>Live Updates</h3>
              <p className={cn.description}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div className={cn.featureRight}>
              <img src={`${PUBLIC_URL}/medal.svg`} alt="Internal Ranking Logo" width={85} />
              <h3 className={cn.header}>Ranking</h3>
              <p className={cn.description}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.{' '}
              </p>
            </div>
          </div>
          <Button
            onClick={() => setModal({ user_register: true })}
            variant="secondary"
            width="max-content"
            margin="25px 0px 0px 0px"
          >
            Create Account
          </Button>
        </div>
        <div className={cn.footer}>
          <p>&copy; {year} Internal Ranking</p>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  loginUser: loginUserAction,
  setModal: setModalAction,
  setLoading: setLoadingAction,
  handleApiError: handleApiErrorProps,
};

export default connect(null, mapDispatchToProps)(RootPage);
