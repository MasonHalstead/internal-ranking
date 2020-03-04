import React from 'react';
import * as PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InputBase } from './InputBase';
import cn from './Input.module.scss';

export const InputMulti = ({
  auto_focus,
  value,
  selected,
  row_key,
  placeholder,
  disabled,
  handleOnRemove,
  handleOnFocus,
  handleOpen,
  handleOnKeyDown,
  handleOnChange,
}) => (
  <div className={cn.inputMultiContainer}>
    {selected.map(select => (
      <div key={select.uuid} className={cn.keyword}>
        <FontAwesomeIcon
          className={cn.remove}
          icon="times"
          onClick={() => handleOnRemove(select)}
        />
        <p className={cn.text}>{select[row_key]}</p>
      </div>
    ))}
    <InputBase
      auto_focus={auto_focus}
      value={value}
      width={150}
      placeholder={placeholder}
      disabled={disabled}
      handleOpen={handleOpen}
      handleOnFocus={handleOnFocus}
      handleOnChange={handleOnChange}
      handleOnKeyDown={handleOnKeyDown}
    />
  </div>
);
InputMulti.defaultProps = {
  placeholder: '',
  value: '',
  row_key: 'uuid',
  selected: [],
  auto_focus: false,
  disabled: false,
  handleOpen: () => {},
  handleOnFocus: () => {},
  handleOnRemove: () => {},
  handleOnKeyDown: () => {},
  handleOnChange: () => {},
};
InputMulti.propTypes = {
  disabled: PropTypes.any,
  value: PropTypes.any,
  row_key: PropTypes.string,
  selected: PropTypes.array,
  auto_focus: PropTypes.bool,
  placeholder: PropTypes.string,
  handleOpen: PropTypes.func,
  handleOnRemove: PropTypes.func,
  handleOnFocus: PropTypes.func,
  handleOnKeyDown: PropTypes.func,
  handleOnChange: PropTypes.func,
};
