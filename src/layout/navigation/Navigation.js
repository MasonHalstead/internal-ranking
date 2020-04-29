import React from 'react';
import * as PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import cn from './Navigation.module.scss';
const { PUBLIC_URL } = process.env;

export const Navigation = React.memo(({ user, paths, handleOrganization, logoutUser }) => (
  <div className={cn.navigationContainer}>
    <Link to="/profile" className={classNames(cn.navigation, { [cn.active]: paths[1] === 'profile' })}>
      Profile
    </Link>
    <div
      onClick={handleOrganization}
      className={classNames(cn.navigation, { [cn.active]: paths[1] === 'organization' })}
    >
      Organization
    </div>
    <Link to="/friends" className={classNames(cn.navigation, { [cn.active]: paths[1] === 'friends' })}>
      Friends
    </Link>
    <Link to="/teams" className={classNames(cn.navigation, { [cn.active]: paths[1] === 'teams' })}>
      Teams
    </Link>
    <div className={cn.flex} />
    <Link to="/profile" className={cn.user}>
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
  paths: PropTypes.array,
  handleOrganization: PropTypes.func,
  logoutUser: PropTypes.func,
};
