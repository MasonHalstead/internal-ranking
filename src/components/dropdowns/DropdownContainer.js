import React, { useRef, useState, useEffect } from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { Input } from '../inputs/Input';
import { Select } from '../selects/Select';
import { Tooltip } from '../tooltip/Tooltip';
import cn from './Dropdown.module.scss';

export const DropdownContainer = ({
  tooltip,
  input,
  select,
  margin,
  width,
  background,
  disabled,
  bulk,
  component: SelectComponent,
  handleOnKeyDown,
  handleOnRemove,
  handleOnChange,
  handleOnSelect,
  handleOnToggle,
  handleOnMultiSelect,
  selected,
}) => {
  const [open, setToggle] = useState(false);
  const [dropdown_focus, setFocus] = useState(false);
  const node = useRef();
  const handleOpen = () => {
    handleOnToggle(true);
    setFocus(true);
    setToggle(true);
  };
  const handleClose = () => {
    handleOnToggle(false);
    setFocus(false);
    setToggle(false);
  };
  const handleToggle = () => {
    handleOnToggle(!open);
    setFocus(!dropdown_focus);
    setToggle(!open);
  };
  const handleSelect = item => {
    handleOnSelect(item);
    handleClose();
  };
  const handleChange = item => {
    handleOnChange(item);
    setFocus(true);
    setToggle(true);
  };
  const handleKeyDown = e => {
    handleOnKeyDown(e);
    if (e.keyCode === 13) {
      handleClose();
    }
  };
  const handleClickOutside = e => {
    if (node.current.contains(e.target)) {
      return;
    }
    handleClose();
  };

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });
  return (
    <div
      className={classNames(cn.dropdown, { [cn.dropdownBulk]: bulk })}
      ref={node}
      style={{ margin, width, background }}
    >
      <Input
        {...input}
        bulk={bulk}
        disabled={disabled}
        dropdown_focus={dropdown_focus}
        handleClose={handleClose}
        handleOnFocus={handleOpen}
        handleToggle={handleToggle}
        handleOnKeyDown={handleKeyDown}
        handleOnRemove={handleOnRemove}
        handleOnChange={handleChange}
        dropdown
      />
      {tooltip && <Tooltip title={tooltip} left={0} top={30} />}
      {open && !disabled && (
        <div className={cn.selectComponentContainer}>
          <SelectComponent
            {...select}
            bulk={bulk}
            selected={selected}
            handleClose={handleClose}
            handleOpen={handleOpen}
            handleSelect={handleSelect}
            handleSelectMulti={handleOnMultiSelect}
          />
        </div>
      )}
    </div>
  );
};

DropdownContainer.defaultProps = {
  input: {},
  select: {},
  tooltip: false,
  component: Select,
  disabled: false,
  selected: [],
  margin: '',
  width: '100%',
  background: 'transparent',
  bulk: false,
  handleOnKeyDown: () => {},
  handleOnChange: () => {},
  handleOnSelect: () => {},
  handleOnRemove: () => {},
  handleOnMultiSelect: () => {},
  handleOnToggle: () => {},
};

DropdownContainer.propTypes = {
  input: PropTypes.object,
  tooltip: PropTypes.any,
  select: PropTypes.object,
  disabled: PropTypes.bool,
  margin: PropTypes.string,
  width: PropTypes.string,
  background: PropTypes.string,
  bulk: PropTypes.bool,
  component: PropTypes.any,
  handleOnRemove: PropTypes.func,
  handleOnKeyDown: PropTypes.func,
  handleOnChange: PropTypes.func,
  handleOnSelect: PropTypes.func,
  handleOnMultiSelect: PropTypes.func,
  handleOnToggle: PropTypes.func,
  selected: PropTypes.array,
};
