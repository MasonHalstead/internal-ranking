import React from 'react';
import * as PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from './Input.module.scss';

export const InputIcon = ({ badge, rows, icon, handleOnFocus }) => (
  <div onClick={handleOnFocus} className={cn.inputIcon}>
    {badge && rows.length > 0 && <div className={cn.badge}>{rows.length}</div>}
    <FontAwesomeIcon icon={icon} />
  </div>
);
InputIcon.defaultProps = {
  badge: false,
  rows: [],
  icon: 'chevron-down',
  handleOnFocus: () => {},
};
InputIcon.propTypes = {
  badge: PropTypes.bool,
  rows: PropTypes.array,
  icon: PropTypes.string,
  handleOnFocus: PropTypes.func,
};
