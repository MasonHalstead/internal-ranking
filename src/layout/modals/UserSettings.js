import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { handleApiError as handleApiErrorProps } from 'ducks/operators/settings';
import { setModal as setModalAction, updateUser as updateUserAction, setLoading as setLoadingAction } from 'ducks/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Checkbox } from 'components/checkbox/Checkbox';
import { Input } from 'components/inputs/Input';
import { putData } from 'utils/axios';
import { Modal } from 'components/modals/Modal';
import { Button } from 'components/buttons/Button';
import classNames from 'classnames';
import cn from './Modals.module.scss';

class ConnectedUserSettings extends PureComponent {
  static propTypes = {
    closeModal: PropTypes.func,
    handleApiError: PropTypes.func,
    setLoading: PropTypes.func,
    updateUser: PropTypes.func,
    user_settings: PropTypes.bool,
    user: PropTypes.object,
  };

  state = {
    page: 1,
    first_name: '',
    last_name: '',
    telephone: '',
    wallet_address: '',
    text_messages: undefined,
    oanda_key: undefined,
    oanda_secret: undefined,
    kraken_key: undefined,
    kraken_secret: undefined,
    bitmex_key: undefined,
    bitmex_secret: undefined,
  };

  componentDidMount() {
    const { user } = this.props;
    this.setState({
      first_name: user.first_name || '',
      last_name: user.last_name || '',
      telephone: user.telephone || '',
      wallet_address: user.wallet_address || '',
      text_messages: user.text_messages || false,
    });
  }

  handlePage = page => this.setState({ page });

  handleFirstName = input => {
    this.setState({ first_name: input.value });
  };

  handleLastName = input => {
    this.setState({ last_name: input.value });
  };

  handleWalletAddress = input => {
    this.setState({ wallet_address: input.value });
  };

  handleTelephone = input => {
    this.setState({ telephone: input.value });
  };

  handleOandaKey = input => {
    this.setState({ oanda_key: input.value });
  };

  handleKrakenSecret = input => {
    this.setState({ kraken_secret: input.value });
  };

  handleKrakenKey = input => {
    this.setState({ kraken_key: input.value });
  };

  handleOandaSecret = input => {
    this.setState({ oanda_secret: input.value });
  };

  handleBitmexKey = input => {
    this.setState({ bitmex_key: input.value });
  };

  handleBitmexSecret = input => {
    this.setState({ bitmex_secret: input.value });
  };

  handleTextMessages = checked => {
    this.setState({ text_messages: checked });
  };

  handleSubmit = async () => {
    const { setLoading, updateUser, handleApiError } = this.props;
    const {
      oanda_key,
      oanda_secret,
      kraken_key,
      kraken_secret,
      bitmex_key,
      bitmex_secret,
      wallet_address,
      first_name,
      last_name,
      telephone,
      text_messages,
    } = this.state;

    setLoading(true);

    const data = {
      oanda_key,
      oanda_secret,
      kraken_key,
      kraken_secret,
      bitmex_key,
      bitmex_secret,
      first_name,
      last_name,
      wallet_address,
      telephone,
      text_messages,
    };
    try {
      const res = await putData('/users/update', data);
      await updateUser({ ...res.data });
      this.handleModalClose();
    } catch (err) {
      handleApiError(err);
    }
    setLoading(false);
  };

  handleModalClose = () => {
    const { closeModal } = this.props;
    this.setState({
      kraken_key: undefined,
      kraken_secret: undefined,
      oanda_key: undefined,
      oanda_secret: undefined,
      bitmex_key: undefined,
      bitmex_secret: undefined,
    });
    closeModal({ user_settings: false });
  };

  render() {
    const { user_settings } = this.props;
    const {
      page,
      first_name,
      last_name,
      wallet_address,
      telephone,
      text_messages,
      oanda_key,
      oanda_secret,
      kraken_key,
      kraken_secret,
      bitmex_key,
      bitmex_secret,
    } = this.state;
    return (
      <Modal show={user_settings} handleClose={this.handleModalClose}>
        <div className={cn.userModal}>
          <h3 className={cn.subTitle}>Settings</h3>
          <h2 className={cn.modalTitle}>{page === 1 ? 'User Settings' : 'API Settings'}</h2>
          {page === 1 && (
            <>
              <Input label="First Name" value={first_name} margin="0px 0px 10px 0px" handleOnChange={this.handleFirstName} />
              <Input label="Last Name" value={last_name} margin="0px 0px 10px 0px" handleOnChange={this.handleLastName} />
              <Input
                label="Telephone"
                value={telephone}
                type="telephone"
                margin="0px 0px 10px 0px"
                handleOnChange={this.handleTelephone}
              />
              <Input
                label="Personal Address"
                value={wallet_address}
                margin="0px 0px 10px 0px"
                handleOnChange={this.handleWalletAddress}
              />
              <Checkbox
                toggleChecked={this.handleTextMessages}
                checked={text_messages}
                font_weight={400}
                margin="10px 0px 10px 0px"
                label="Allow Text Messages"
              />
            </>
          )}
          {page === 2 && (
            <>
              <Input
                label="Bitmex Api Key"
                value={bitmex_key}
                type="password"
                margin="0px 0px 10px 0px"
                handleOnChange={this.handleBitmexKey}
              />
              <Input
                label="Bitmex Api Secret"
                value={bitmex_secret}
                type="password"
                margin="0px 0px 10px 0px"
                handleOnChange={this.handleBitmexSecret}
              />
              <Input
                label="Kraken Api Key"
                value={kraken_key}
                type="password"
                margin="0px 0px 10px 0px"
                handleOnChange={this.handleKrakenKey}
              />
              <Input
                label="Kraken Api Secret"
                value={kraken_secret}
                type="password"
                margin="0px 0px 10px 0px"
                handleOnChange={this.handleKrakenSecret}
              />
              <Input
                label="Oanda Api Key"
                value={oanda_key}
                type="password"
                margin="0px 0px 10px 0px"
                handleOnChange={this.handleOandaKey}
              />
              <Input
                label="Oanda Api Secret"
                value={oanda_secret}
                type="password"
                margin="0px 0px 10px 0px"
                handleOnChange={this.handleOandaSecret}
              />
            </>
          )}
          <div className={cn.actionContainer}>
            <div className={classNames(cn.actions, { [cn.active]: page === 1 })} onClick={() => this.handlePage(1)}>
              <FontAwesomeIcon icon="chevron-left" />
              <p>User Settings</p>
            </div>
            <div className={classNames(cn.actions, { [cn.active]: page === 2 })} onClick={() => this.handlePage(2)}>
              <p>API Settings</p>
              <FontAwesomeIcon icon="chevron-right" />
            </div>
          </div>
          <Button onClick={this.handleSubmit} variant="secondary" margin="10px 0px 0px 0px">
            Update User Settings
          </Button>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  error_message: state.settings.error_message,
  user_settings: state.modals.user_settings,
  user: state.user,
});

const mapDispatchToProps = {
  handleApiError: handleApiErrorProps,
  closeModal: setModalAction,
  setLoading: setLoadingAction,
  updateUser: updateUserAction,
};

export const UserSettings = connect(mapStateToProps, mapDispatchToProps)(ConnectedUserSettings);
