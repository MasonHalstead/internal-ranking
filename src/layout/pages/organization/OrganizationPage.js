import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getOrganizationConfig as getOrganizationConfigProps } from 'ducks/operators/organization';
import { handleApiError as handleApiErrorProps } from 'ducks/operators/settings';
import { setLoading as setLoadingAction, setModal as setModalAction } from 'ducks/actions';
import { Table } from 'components/table/Table';
import cn from './OrganizationPage.module.scss';
const { PUBLIC_URL } = process.env;

export class OrganizationPage extends PureComponent {
  static propTypes = {
    user: PropTypes.object,
    avatars: PropTypes.array,
    location: PropTypes.object,
    getOrganizationConfig: PropTypes.func,
    setModal: PropTypes.func,
    setLoading: PropTypes.func,
    handleApiError: PropTypes.func,
  };

  state = {
    first_name: '',
    last_name: '',
    updated_at: '',
  };

  // static getDerivedStateFromProps(props, state) {
  //   const { updated_at } = state;
  //   const { user } = props;
  //   if (user.updated_at !== updated_at) {
  //     return {
  //       first_name: user.first_name,
  //       last_name: user.last_name,
  //       updated_at: user.updated_at,
  //     };
  //   }
  //   return null;
  // }

  componentDidMount() {
    this.setInitialData();
  }

  setInitialData = async () => {
    const { setLoading, location, getOrganizationConfig, handleApiError } = this.props;
    const paths = location.pathname.split('/');
    try {
      await getOrganizationConfig(paths[2]);
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

  // handleSubmit = async () => {
  //   const { setLoading, updateUser, getUserToken, setModal, handleApiError } = this.props;
  //   const { first_name, last_name } = this.state;

  //   const data = {
  //     first_name,
  //     last_name,
  //   };
  //   try {
  //     await updateUser(data);
  //     await getUserToken();
  //   } catch (err) {
  //     await setModal({ user_update: false });
  //     handleApiError(err);
  //   }
  //   setLoading(false);
  // };

  render() {
    const { avatar, organization_name, email_address } = this.props.organization;
    return (
      <div className={cn.page}>
        <div className={cn.left}>
          <Table />
        </div>
        <div className={cn.right}>
          <img
            className={cn.logo}
            src={`${PUBLIC_URL}/avatars/${avatar}`}
            alt="Internal Ranking Avatars"
            role="presentation"
            width={120}
          />
          <h3>{organization_name}</h3>
          <h4>{email_address}</h4>
          <div className={cn.metrics}>
            <div className={cn.left}>
              <p>Users</p>
              <p>10</p>
            </div>
            <div className={cn.right}>
              <p>Matches</p>
              <p>10</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  avatars: state.avatars,
  organization: state.organization,
});

const mapDispatchToProps = {
  setModal: setModalAction,
  getOrganizationConfig: getOrganizationConfigProps,
  handleApiError: handleApiErrorProps,
  setLoading: setLoadingAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationPage);
