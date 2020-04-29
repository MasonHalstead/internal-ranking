import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { registerUser as registerUserProps } from 'ducks/operators/user';
import {
  createOrganization as createOrganizationProps,
  joinOrganization as joinOrganizationProps,
  getOrganization as getOrganizationProps,
} from 'ducks/operators/organization';
import { handleApiError as handleApiErrorProps } from 'ducks/operators/settings';
import { setModal as setModalAction, setLoading as setLoadingAction } from 'ducks/actions';
import { Dropdown } from 'components/dropdowns/Dropdown';
import { Input } from 'components/inputs/Input';
import { Modal } from 'components/modals/Modal';
import { Button } from 'components/buttons/Button';
import cn from './Modals.module.scss';
const { PUBLIC_URL } = process.env;

class ConnectedUserOrganization extends PureComponent {
  static propTypes = {
    setModal: PropTypes.func,
    handleApiError: PropTypes.func,
    setLoading: PropTypes.func,
    createOrganization: PropTypes.func,
    joinOrganization: PropTypes.func,
    user_organization: PropTypes.bool,
    history: PropTypes.object,
    user: PropTypes.object,
  };

  state = {
    organization_types: [
      {
        organization_type_name: 'New Organization',
        organization_type_id: 1,
        uuid: 1,
      },
      {
        organization_type_name: 'Existing Organization',
        organization_type_id: 2,
        uuid: 2,
      },
    ],
    organization_type_name: '',
    organization_type_id: null,
    organization_code: '',
    organization_name: '',
  };

  handleOrganizationType = item => {
    this.setState(item);
  };

  handleOrganizationName = input => {
    this.setState({ organization_name: input.value });
  };

  handleOrganizationCode = input => {
    this.setState({ organization_code: input.value });
  };

  handleSubmit = async () => {
    const { setLoading, createOrganization, joinOrganization, user, history, handleApiError } = this.props;
    const { organization_type_id, organization_name, organization_code } = this.state;
    const data = {
      user_id: user.user_id,
      email_address: user.email_address,
      organization_name,
    };
    try {
      if (!organization_type_id) {
        throw Error('Please select a valid Organization Type');
      }
      if (organization_type_id === 1) {
        await createOrganization(data, history);
      }
      if (organization_type_id === 2) {
        await joinOrganization({ organization_code }, history);
      }
      this.handleModalClose();
    } catch (err) {
      await this.handleModalClose();
      handleApiError(err);
    }
    setLoading(false);
  };

  handleModalClose = () => {
    const { setModal } = this.props;
    this.setState({
      organization_type_name: '',
      organization_type_id: null,
      organization_name: '',
      organization_code: '',
    });
    setModal({ user_organization: false });
  };

  render() {
    const { user_organization } = this.props;
    const {
      organization_types,
      organization_code,
      organization_type_id,
      organization_type_name,
      organization_name,
    } = this.state;
    return (
      <Modal show={user_organization} width={400} handleClose={this.handleModalClose}>
        <div className={cn.userModal}>
          <img
            className={cn.userImage}
            src={`${PUBLIC_URL}/logo.svg`}
            alt="Internal Ranking Logo"
            width={80}
          />
          <Dropdown
            label="Organization Type"
            rows={organization_types}
            row_key="organization_type_name"
            value={organization_type_name}
            margin="10px 0px 0px 0px"
            handleOnSelect={this.handleOrganizationType}
          />
          {organization_type_id === 1 && (
            <Input
              label="Organization Name"
              value={organization_name}
              margin="10px 0px 0px 0px"
              handleOnChange={this.handleOrganizationName}
            />
          )}
          {organization_type_id === 2 && (
            <Input
              label="Organization Code"
              type="password"
              value={organization_code}
              margin="10px 0px 0px 0px"
              handleOnChange={this.handleOrganizationCode}
            />
          )}
          <Button margin="20px 0px 0px 0px" onClick={this.handleSubmit}>
            Submit
          </Button>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  user_organization: state.modals.user_organization,
});

const mapDispatchToProps = {
  handleApiError: handleApiErrorProps,
  setModal: setModalAction,
  createOrganization: createOrganizationProps,
  getOrganization: getOrganizationProps,
  joinOrganization: joinOrganizationProps,
  registerUser: registerUserProps,
  setLoading: setLoadingAction,
};

export const UserOrganization = connect(mapStateToProps, mapDispatchToProps)(ConnectedUserOrganization);
