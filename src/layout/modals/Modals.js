import React from 'react';
import PropTypes from 'prop-types';
import { ApiError } from './ApiError';
import { UserLogin } from './UserLogin';
import { UserReset } from './UserReset';
import { UserRegister } from './UserRegister';
import { UserUpdate } from './UserUpdate';
import { UserOrganization } from './UserOrganization';

export class Modals extends React.PureComponent {
  static propTypes = {
    private_modals: PropTypes.bool,
    history: PropTypes.object,
  };

  static defaultProps = {
    private_modals: false,
    history: {},
  };

  render() {
    const { private_modals, history } = this.props;
    return (
      <>
        <UserRegister />
        <UserReset />
        <ApiError />
        <UserLogin />
        <UserOrganization history={history} />
        {private_modals && (
          <>
            <UserUpdate />
          </>
        )}
      </>
    );
  }
}
