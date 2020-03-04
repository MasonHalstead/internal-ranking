import React from 'react';
import * as PropTypes from 'prop-types';
import cn from './TextArea.module.scss';

export const TextAreaBase = React.memo(
  ({
    value,
    width,
    min_height,
    placeholder,
    disabled,
    handleOnFocus,
    handleOnBlur,
    handleOnChange,
    handleOnKeyDown,
  }) => (
    <textarea
      className={cn.textarea}
      disabled={disabled}
      spellCheck="false"
      autoComplete="new-password"
      placeholder={placeholder}
      value={value}
      onChange={handleOnChange}
      onFocus={handleOnFocus}
      onBlur={handleOnBlur}
      onKeyDown={handleOnKeyDown}
      style={{ minHeight: min_height, width }}
    />
  ),
);
TextAreaBase.defaultProps = {
  placeholder: '',
  value: '',
  disabled: false,
  min_height: '40px',
  width: '100%',
  handleOnBlur: () => {},
  handleOnFocus: () => {},
  handleOnChange: () => {},
  handleOnKeyDown: () => {},
};
TextAreaBase.propTypes = {
  disabled: PropTypes.any,
  value: PropTypes.any,
  width: PropTypes.string,
  placeholder: PropTypes.string,
  min_height: PropTypes.string,
  handleOnBlur: PropTypes.func,
  handleOnFocus: PropTypes.func,
  handleOnChange: PropTypes.func,
  handleOnKeyDown: PropTypes.func,
};
