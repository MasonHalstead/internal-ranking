import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  updateUser as updateUserProps,
  getUser as getUserProps,
  getUserToken as getUserTokenProps,
} from 'ducks/operators/user';
import { handleApiError as handleApiErrorProps } from 'ducks/operators/settings';
import { setLoading as setLoadingAction, setModal as setModalAction } from 'ducks/actions';
import { Input } from 'components/inputs/Input';
import { Button } from 'components/buttons/Button';
import cn from './ProfilePage.module.scss';
const { PUBLIC_URL } = process.env;

export class ProfilePage extends PureComponent {
  static propTypes = {
    user: PropTypes.object,
    avatars: PropTypes.array,
    updateUser: PropTypes.func,
    getUser: PropTypes.func,
    setModal: PropTypes.func,
    setLoading: PropTypes.func,
    getUserToken: PropTypes.func,
    handleApiError: PropTypes.func,
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

  componentDidMount() {
    this.setInitialData();
  }

  setInitialData = async () => {
    const { setLoading, getUser, setModal, handleApiError } = this.props;
    try {
      const user = await getUser();
      if (!user.first_name) {
        await setModal({ user_update: true });
      }
      this.setState({ ...user });
    } catch (err) {
      handleApiError(err);
    }
    setLoading(false);
  };

  handleFirstName = input => {
    this.setState({ first_name: input.value });
  };

  handleLastName = input => {
    this.setState({ last_name: input.value });
  };

  handleAvatar = async avatar => {
    const { updateUser, setLoading, handleApiError } = this.props;
    try {
      await updateUser({ avatar });
    } catch (err) {
      handleApiError(err);
    }
    setLoading(false);
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
    } catch (err) {
      await setModal({ user_update: false });
      handleApiError(err);
    }
    setLoading(false);
  };

  render() {
    const { user } = this.props;
    const { avatars } = this.props;
    const { first_name, last_name } = this.state;
    return (
      <div className={cn.page}>
        <div className={cn.profile}>
          <div className={cn.top}>
            <img
              className={cn.logo}
              src={`${PUBLIC_URL}/avatars/${user.avatar}`}
              alt="Internal Ranking Logo"
              width={170}
            />
            <div className={cn.inputs}>
              <Input
                label="First Name"
                value={first_name}
                width="100%"
                handleOnChange={this.handleFirstName}
              />
              <Input
                label="Last Name"
                value={last_name}
                width="100%"
                margin="10px 0px 0px 0px"
                handleOnChange={this.handleLastName}
              />
              <div className={cn.flex} />
              <Button margin="20px 0px 0px 0px" onClick={this.handleSubmit}>
                Update Account
              </Button>
            </div>
          </div>
          <div className={cn.bottom}>
            {avatars.map(avatar => (
              <img
                className={cn.logo}
                key={avatar}
                onClick={() => this.handleAvatar(avatar)}
                src={`${PUBLIC_URL}/avatars/${avatar}`}
                alt="Internal Ranking Avatars"
                role="presentation"
                width={60}
              />
            ))}
          </div>
        </div>
        <div className={cn.match}>
          <img
            className={cn.logo}
            src={`${PUBLIC_URL}/matches.svg`}
            alt="Internal Ranking Matches"
            role="presentation"
            width={240}
          />
          <div className={cn.flex} />
          <Button margin="20px 0px 0px 0px" onClick={this.handleSubmit}>
            Submit Match
          </Button>
        </div>
        <div className={cn.competition}>
          <img
            className={cn.logo}
            src={`${PUBLIC_URL}/competition.svg`}
            alt="Internal Ranking Matches"
            role="presentation"
            width={240}
          />
          <div className={cn.flex} />
          <Button margin="20px 0px 0px 0px" onClick={this.handleSubmit}>
            Create Competition
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  avatars: state.avatars,
});

const mapDispatchToProps = {
  updateUser: updateUserProps,
  getUser: getUserProps,
  setModal: setModalAction,
  getUserToken: getUserTokenProps,
  handleApiError: handleApiErrorProps,
  setLoading: setLoadingAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
