import React from 'react';
import PropTypes from 'prop-types';
import { ApiError } from './ApiError';
import { UserLogin } from './UserLogin';
import { UserReset } from './UserReset';
import { UserRegister } from './UserRegister';
import { UserUpdate } from './UserUpdate';

export class Modals extends React.PureComponent {
  static propTypes = {
    private_modals: PropTypes.bool,
  };

  static defaultProps = {
    private_modals: false,
  };

  render() {
    const { private_modals } = this.props;
    return (
      <>
        <UserRegister />
        <UserReset />
        <ApiError />
        <UserLogin />
        {private_modals && (
          <>
            <UserUpdate />
          </>
        )}
      </>
    );
  }
}
