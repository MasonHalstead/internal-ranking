import React, { useEffect, useState } from 'react';
import * as PropTypes from 'prop-types';
import { InputIcon } from 'components/inputs/InputIcon';
import { DropdownContainer } from './DropdownContainer';

const DropdownIcon = ({
  label,
  disabled,
  tooltip,
  icon,
  width,
  background,
  margin,
  extended,
  select_title,
  row_key,
  empty_text,
  bulk,
  left,
  right,
  rows,
  handleOnSelect,
  value,
}) => {
  const [selected, setSelected] = useState('');
  useEffect(() => setSelected(value), [selected]);
  const handleOnSelectRow = row => {
    setSelected(row[row_key]);
    handleOnSelect(row);
  };
  return (
    <DropdownContainer
      handleOnSelect={handleOnSelectRow}
      disabled={disabled}
      bulk={bulk}
      margin={margin}
      width={width}
      background={background}
      tooltip={tooltip}
      input={{
        component: InputIcon,
        label,
        icon,
      }}
      select={{
        rows,
        extended,
        select_title,
        selected,
        row_key,
        empty_text,
        disabled,
        left,
        right,
        width: 'max-content',
      }}
    />
  );
};

DropdownIcon.defaultProps = {
  label: '',
  disabled: false,
  tooltip: false,
  icon: 'list',
  margin: '0px',
  background: 'transparent',
  width: '34px',
  bulk: false,
  left: 'auto',
  right: 0,
  rows: [],
  extended: [],
  row_key: 'uuid',
  select_title: '',
  empty_text: 'Nothing returned',
  handleOnSelect: () => {},
};

DropdownIcon.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.any,
  left: PropTypes.any,
  right: PropTypes.any,
  tooltip: PropTypes.any,
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
};

export default DropdownIcon;
