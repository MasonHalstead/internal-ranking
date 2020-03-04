import React, { useEffect, useState } from 'react';
import * as PropTypes from 'prop-types';
import { InputList } from 'components./inputs/InputList';
import { SelectCheckbox } from 'components/selects/SelectCheckbox';
import { DropdownContainer } from './DropdownContainer';

const DropdownCheckbox = ({
  label,
  left_icon,
  right_icon,
  placeholder,
  disabled,
  type,
  width,
  text_align,
  background,
  margin,
  extended,
  select_title,
  row_key,
  checked_key,
  empty_text,
  bulk,
  handleOnSelect,
  rows,
}) => {
  const [rowsState, setRows] = useState([]);
  useEffect(() => setRows(rows), [rows]);

  const handleOnMultiSelect = (checked, row) => {
    const index = rowsState.findIndex(r => r.uuid === row.uuid);
    rowsState[index] = {
      ...rowsState,
      [checked_key]: checked,
    };

    setRows(rowsState);
    handleOnSelect(rowsState);
  };
  return (
    <DropdownContainer
      handleOnMultiSelect={handleOnMultiSelect}
      disabled={disabled}
      bulk={bulk}
      margin={margin}
      width={width}
      background={background}
      input={{
        component: InputList,
        label,
        rows: rowsState,
        row_key,
        text_align,
        placeholder,
        left_icon,
        right_icon,
        type,
      }}
      component={SelectCheckbox}
      select={{
        rows: rowsState,
        extended,
        select_title,
        row_key,
        checked_key,
        empty_text,
        disabled,
      }}
    />
  );
};

DropdownCheckbox.defaultProps = {
  label: '',
  placeholder: 'Select...',
  disabled: false,
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
  checked_key: 'value',
  select_title: '',
  empty_text: 'Nothing returned',
  handleOnSelect: () => {},
};

DropdownCheckbox.propTypes = {
  label: PropTypes.string,
  left_icon: PropTypes.any,
  right_icon: PropTypes.any,
  text_align: PropTypes.any,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  empty_text: PropTypes.string,
  rows: PropTypes.array,
  extended: PropTypes.array,
  checked_key: PropTypes.string,
  row_key: PropTypes.string,
  margin: PropTypes.string,
  width: PropTypes.string,
  select_title: PropTypes.string,
  background: PropTypes.string,
  bulk: PropTypes.bool,
  handleOnSelect: PropTypes.func,
};

export default DropdownCheckbox;
