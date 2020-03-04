import React from 'react';
import * as PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from './Input.module.scss';

export const InputIconList = ({ icon, selected, badge, handleToggle }) => (
  <div className={cn.inputIconList} onClick={handleToggle}>
    {badge && selected.length > 0 && (
      <div className={cn.badge}>{selected.length}</div>
    )}
    <FontAwesomeIcon icon={icon} />
  </div>
);
InputIconList.defaultProps = {
  icon: 'list',
  badge: true,
  selected: [],
  handleToggle: () => {},
};
InputIconList.propTypes = {
  icon: PropTypes.string,
  badge: PropTypes.bool,
  selected: PropTypes.array,
  handleToggle: PropTypes.func,
};
