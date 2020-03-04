import React from 'react';
import * as PropTypes from 'prop-types';
import cn from './Input.module.scss';

export const InputList = ({
  badge,
  list,
  placeholder,
  rows,
  row_key,
  handleToggle,
}) => (
  <div className={cn.inputListContainer} onClick={handleToggle}>
    {placeholder && rows.length === 0 && (
      <p className={cn.placeholder}>{placeholder}</p>
    )}
    {badge && rows.length > 0 && <div className={cn.badge}>{rows.length}</div>}
    {list && rows.length > 0 && (
      <p>{rows.map(select => select[row_key]).join(', ')}</p>
    )}
    {!list && rows.length === 1 && <p>{rows[0][row_key]}</p>}
    {!list && rows.length > 1 && <p>Selected Items</p>}
  </div>
);
InputList.defaultProps = {
  placeholder: 'Select Items...',
  row_key: 'uuid',
  badge: true,
  list: true,
  rows: [],
  handleToggle: () => {},
};
InputList.propTypes = {
  row_key: PropTypes.string,
  badge: PropTypes.bool,
  list: PropTypes.bool,
  rows: PropTypes.array,
  placeholder: PropTypes.string,
  handleToggle: PropTypes.func,
};
