import React from 'react';
import * as PropTypes from 'prop-types';
import DebounceInput from 'react-debounce-input';
import cn from './Input.module.scss';

export const InputDebounce = React.memo(
  ({
    debounce,
    auto_focus,
    text_align,
    placeholder,
    disabled,
    handleOnFocus,
    handleOnBlur,
    handleOnChange,
    handleOnKeyDown,
  }) => (
    <DebounceInput
      minLength={1}
      debounceTimeout={debounce}
      className={cn.input}
      spellCheck="false"
      autoComplete="new-password"
      placeholder={placeholder}
      disabled={disabled}
      style={{ textAlign: text_align }}
      autoFocus={auto_focus}
      onChange={handleOnChange}
      onFocus={handleOnFocus}
      onBlur={handleOnBlur}
      onKeyDown={handleOnKeyDown}
    />
  ),
);
InputDebounce.defaultProps = {
  placeholder: '',
  debounce: 300,
  disabled: false,
  auto_focus: false,
  text_align: 'left',
  handleOnBlur: () => {},
  handleOnFocus: () => {},
  handleOnChange: () => {},
  handleOnKeyDown: () => {},
};
InputDebounce.propTypes = {
  disabled: PropTypes.any,
  debounce: PropTypes.number,
  placeholder: PropTypes.string,
  auto_focus: PropTypes.bool,
  text_align: PropTypes.string,
  handleOnBlur: PropTypes.func,
  handleOnFocus: PropTypes.func,
  handleOnChange: PropTypes.func,
  handleOnKeyDown: PropTypes.func,
};
