import React, { useEffect, useState } from 'react';
import * as PropTypes from 'prop-types';
import { InputFake } from 'components/inputs/InputFake';
import { DropdownContainer } from './DropdownContainer';

export const Dropdown = ({
  rows,
  label,
  left_icon,
  right_icon,
  placeholder,
  disabled,
  top,
  right,
  left,
  type,
  width,
  value,
  text_align,
  background,
  margin,
  extended,
  select_title,
  row_key,
  empty_text,
  bulk,
  handleOnSelect,
  selected_index,
}) => {
  const [selected, handleOnSelectValue] = useState('');
  useEffect(() => handleOnSelectValue(value), [selected]);
  const handleOnSelectDropdown = row => {
    handleOnSelectValue(row[row_key]);
    handleOnSelect(row);
  };

  return (
    <DropdownContainer
      handleOnSelect={handleOnSelectDropdown}
      disabled={disabled}
      bulk={bulk}
      margin={margin}
      width={width}
      background={background}
      input={{
        component: InputFake,
        label,
        value,
        text_align,
        placeholder,
        left_icon,
        right_icon,
        type,
      }}
      select={{
        rows,
        extended,
        select_title,
        selected,
        row_key,
        empty_text,
        disabled,
        top,
        right,
        left,
        selected_index,
      }}
    />
  );
};

Dropdown.defaultProps = {
  label: '',
  value: '',
  placeholder: 'Select...',
  disabled: false,
  top: 'auto',
  left: 0,
  right: 0,
  selected_index: 0,
  left_icon: '',
  right_icon: 'chevron-down',
  text_align: 'left',
  type: 'text',
  margin: '0px',
  background: 'transparent',
  width: '100%',
  bulk: false,
  rows: [],
  extended: [],
  row_key: 'uuid',
  select_title: '',
  empty_text: 'Nothing returned',
  handleOnSelect: () => {},
};
Dropdown.propTypes = {
  label: PropTypes.string,
  top: PropTypes.any,
  left: PropTypes.any,
  right: PropTypes.any,
  left_icon: PropTypes.any,
  right_icon: PropTypes.any,
  text_align: PropTypes.any,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  empty_text: PropTypes.string,
  rows: PropTypes.array,
  extended: PropTypes.array,
  row_key: PropTypes.string,
  margin: PropTypes.string,
  width: PropTypes.string,
  select_title: PropTypes.string,
  background: PropTypes.string,
  bulk: PropTypes.bool,
  handleOnSelect: PropTypes.func,
  selected_index: PropTypes.number,
};
