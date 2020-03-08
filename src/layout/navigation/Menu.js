import React from 'react';
import * as PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Tooltip } from 'components/tooltip/Tooltip';
import cn from './Menu.module.scss';
const { PUBLIC_URL } = process.env;

export const Menu = React.memo(({ pathname }) => (
  <div className={cn.menuContainer}>
    <img className={cn.logo} src={`${PUBLIC_URL}/logo.svg`} alt="Internal Ranking Logo" width={50} />
    <Link to="/profile" className={cn.iconWrapper}>
      <FontAwesomeIcon icon="building" />
    </Link>
    <Link to="/profile" className={cn.iconWrapper}>
      <FontAwesomeIcon icon="users" />
    </Link>
    <Link to="/profile" className={cn.iconWrapper}>
      <FontAwesomeIcon icon="user-friends" />
    </Link>
    <Link to="/profile" className={cn.iconWrapper}>
      <FontAwesomeIcon icon="gamepad" />
    </Link>
  </div>
));
Menu.defaultProps = {
  project: {},
  pathname: '',
  open: false,
  handleToggleMenu() {},
};
Menu.propTypes = {
  project: PropTypes.object,
  open: PropTypes.bool,
  pathname: PropTypes.string,
  width: PropTypes.string,
  handleToggleMenu: PropTypes.func,
};

const MenuOptions = ({ open, title }) => (
  <>
    {open && <p className={cn.menuTitle}>{title}</p>}
    {!open && <Tooltip title={title} />}
  </>
);
MenuOptions.defaultProps = {
  open: false,
  title: '',
};
MenuOptions.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string,
};
