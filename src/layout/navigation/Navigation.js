import React from 'react';
import * as PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import cn from './Navigation.module.scss';
const { PUBLIC_URL } = process.env;

export const Navigation = React.memo(({ user, logoutUser }) => (
  <div className={cn.navigationContainer}>
    <Link to={`/profile`} className={cn.navigation}>
      Rankings
    </Link>
    <Link to={`/profile`} className={cn.navigation}>
      Matches
    </Link>
    <Link to={`/profile`} className={cn.navigation}>
      Competitions
    </Link>
    <div className={cn.flex} />
    <Link to={`/profile`} className={cn.user}>
      <img
        className={cn.logo}
        src={`${PUBLIC_URL}/avatars/${user.avatar}`}
        alt="Internal Ranking Logo"
        width={45}
      />
      {user.email_address && <p>{user.email_address}</p>}
    </Link>
    <div className={cn.icon} onClick={logoutUser}>
      <FontAwesomeIcon icon="sign-out-alt" />
    </div>
  </div>
));
Navigation.defaultProps = {
  user: {},
  logoutUser: () => {},
};
Navigation.propTypes = {
  user: PropTypes.object,
  logoutUser: PropTypes.func,
};
