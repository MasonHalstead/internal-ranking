import React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import cn from './Checkbox.module.scss';

export const Checkbox = React.memo(
  ({ toggleChecked, label, margin, font_weight, checked }) => (
    <div
      className={cn.checkboxContainer}
      style={{ margin }}
      onClick={() => toggleChecked(!checked)}
    >
      <input
        type="checkbox"
        spellCheck="false"
        autoComplete="none"
        className={cn.checkboxInput}
        checked={checked}
        readOnly
      />
      {label && (
        <p
          className={classNames(cn.label, { [cn.active]: checked })}
          style={{ fontWeight: font_weight }}
        >
          {label}
        </p>
      )}
    </div>
  ),
);
Checkbox.defaultProps = {
  checked: false,
  label: false,
  margin: '0px',
  font_weight: 300,
  toggleChecked: () => {},
};
Checkbox.propTypes = {
  toggleChecked: PropTypes.func,
  font_weight: PropTypes.number,
  margin: PropTypes.string,
  checked: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};
