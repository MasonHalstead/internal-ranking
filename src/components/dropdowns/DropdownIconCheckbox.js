import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { DropdownContainer } from './DropdownContainer';
import { InputIcon } from '../inputs/InputIcon';
import { SelectCheckbox } from '../selects/SelectCheckbox';

export class DropdownIconCheckbox extends Component {
  static propTypes = {
    label: PropTypes.string,
    icon: PropTypes.any,
    top: PropTypes.any,
    left: PropTypes.any,
    right: PropTypes.any,
    tooltip: PropTypes.any,
    disabled: PropTypes.bool,
    empty_text: PropTypes.string,
    rows: PropTypes.array,
    extended: PropTypes.array,
    row_key: PropTypes.string,
    checked_key: PropTypes.string,
    margin: PropTypes.string,
    width: PropTypes.string,
    selected: PropTypes.array,
    select_title: PropTypes.string,
    background: PropTypes.string,
    bulk: PropTypes.bool,
    handleOnSelect: PropTypes.func,
  };

  static defaultProps = {
    label: '',
    disabled: false,
    tooltip: false,
    icon: 'list',
    margin: '0px',
    background: 'transparent',
    width: '40px',
    bulk: false,
    selected: [],
    left: 'auto',
    right: 0,
    extended: [],
    rows: [],
    row_key: 'uuid',
    checked_key: 'value',
    select_title: '',
    empty_text: 'Nothing returned',
    handleOnSelect: () => {},
  };

  state = {
    rows: [],
  };

  componentDidMount() {
    const { rows } = this.props;
    this.setState({ rows });
  }

  handleOnMultiSelect = (checked, row) => {
    const { rows } = this.state;
    const { handleOnSelect, checked_key } = this.props;

    const index = rows.findIndex(r => r.uuid === row.uuid);
    rows[index] = {
      ...row,
      [checked_key]: checked,
    };

    this.setState({ rows });
    handleOnSelect(rows);
  };

  render() {
    const {
      label,
      tooltip,
      icon,
      disabled,
      width,
      top,
      right,
      left,
      background,
      margin,
      extended,
      select_title,
      row_key,
      checked_key,
      empty_text,
      bulk,
      selected,
    } = this.props;
    const { rows, value } = this.state;
    return (
      <DropdownContainer
        handleOnMultiSelect={this.handleOnMultiSelect}
        disabled={disabled}
        bulk={bulk}
        margin={margin}
        width={width}
        selected={selected}
        background={background}
        tooltip={tooltip}
        input={{
          component: InputIcon,
          label,
          icon,
          rows: rows.filter(row => row[checked_key]),
          badge: true,
        }}
        component={SelectCheckbox}
        select={{
          rows,
          value,
          extended,
          select_title,
          row_key,
          checked_key,
          empty_text,
          disabled,
          top,
          right,
          left,
        }}
      />
    );
  }
}
