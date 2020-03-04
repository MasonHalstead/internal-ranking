import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { setModal as setModalAction, setErrorMessage as setErrorMessageAction } from 'ducks/actions';
import { Modal } from 'components/modals/Modal';
import cn from './Modals.module.scss';

class ConnectedApiError extends PureComponent {
  static propTypes = {
    setModal: PropTypes.func,
    setErrorMessage: PropTypes.func,
    api_error: PropTypes.bool,
    error_message: PropTypes.string,
  };

  handleClose = () => {
    const { setModal, setErrorMessage } = this.props;
    setErrorMessage('');
    setModal({ api_error: false });
  };

  render() {
    const { api_error, error_message } = this.props;

    return (
      <Modal show={api_error} variant="secondary" handleClose={this.handleClose}>
        <div className={cn.errorModal}>
          <div className={cn.errorContainer}>
            <FontAwesomeIcon className={cn.errorIcon} icon="exclamation-triangle" />
          </div>
          <h3 className={cn.modalTitle}>API Error</h3>
          <p className={cn.modalError}>{error_message}</p>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  error_message: state.settings.error_message,
  api_error: state.modals.api_error,
});

const mapDispatchToProps = {
  setErrorMessage: setErrorMessageAction,
  setModal: setModalAction,
};

export const ApiError = connect(mapStateToProps, mapDispatchToProps)(ConnectedApiError);
