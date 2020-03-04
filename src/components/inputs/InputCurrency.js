import React from 'react';
import * as PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import cn from './Input.module.scss';

export const InputCurrency = React.memo(
  ({
    value,
    auto_focus,
    text_align,
    placeholder,
    disabled,
    handleOnFocus,
    handleOnBlur,
    handleOnChange,
    handleOnKeyDown,
  }) => (
    <NumberFormat
      thousandSeparator
      decimalScale={2}
      prefix="$"
      className={cn.input}
      disabled={disabled}
      placeholder={placeholder}
      autoFocus={auto_focus}
      spellCheck="false"
      autoComplete="new-password"
      value={value}
      style={{ textAlign: text_align }}
      onValueChange={handleOnChange}
      onFocus={handleOnFocus}
      onBlur={handleOnBlur}
      onKeyDown={handleOnKeyDown}
    />
  ),
);
InputCurrency.defaultProps = {
  placeholder: '',
  value: '',
  disabled: false,
  auto_focus: false,
  text_align: 'right',
  handleOnBlur: () => {},
  handleOnFocus: () => {},
  handleOnChange: () => {},
  handleOnKeyDown: () => {},
};
InputCurrency.propTypes = {
  disabled: PropTypes.any,
  value: PropTypes.any,
  placeholder: PropTypes.string,
  auto_focus: PropTypes.bool,
  text_align: PropTypes.string,
  handleOnBlur: PropTypes.func,
  handleOnFocus: PropTypes.func,
  handleOnChange: PropTypes.func,
  handleOnKeyDown: PropTypes.func,
};
