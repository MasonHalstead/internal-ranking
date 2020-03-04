import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from './Snackbar.module.scss';

export const Snackbar = React.memo(({ children, width, icon, onClick }) => (
  <div
    className={cn.snackbar}
    style={{ width }}
    onClick={onClick}
    type="button"
  >
    {children}
    {icon && <FontAwesomeIcon className={cn.icon} icon={icon} />}
  </div>
));
Snackbar.defaultProps = {
  icon: 'times',
  width: 'max-content',
  onClick: () => {},
};
Snackbar.propTypes = {
  left_icon: PropTypes.any,
  right_icon: PropTypes.any,
  width: PropTypes.any,
  children: PropTypes.any,
  onClick: PropTypes.func,
};
