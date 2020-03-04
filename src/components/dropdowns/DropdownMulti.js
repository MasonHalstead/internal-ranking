import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { DropdownContainer } from './DropdownContainer';
import { InputMulti } from '../inputs/InputMulti';
import { SelectMulti } from '../selects/SelectMulti';

export class DropdownMulti extends Component {
  static propTypes = {
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
    selected: PropTypes.array,
    row_key: PropTypes.string,
    margin: PropTypes.string,
    width: PropTypes.string,
    select_title: PropTypes.string,
    background: PropTypes.string,
    bulk: PropTypes.bool,
    handleOnSelect: PropTypes.func,
  };

  static defaultProps = {
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
    selected: [],
    extended: [],
    row_key: 'uuid',
    select_title: '',
    empty_text: 'Nothing returned',
    handleOnSelect: () => {},
  };

  state = {
    select_index: 0,
    selected: [],
    rows: [],
    value: '',
    key_codes: {
      down_arrow: 40,
      up_arrow: 38,
      enter: 13,
      delete: 8,
    },
  };

  componentDidMount() {
    const { selected, rows } = this.props;
    this.setState({ selected, rows });
  }

  handleOnChange = input => {
    const { selected } = this.state;
    const { rows } = this.props;
    const new_rows = this.filterRowArray(selected, rows, input.value);
    this.setState({ value: input.value, rows: new_rows });
  };

  handleOnRemove = item => {
    const { selected, value } = this.state;
    const { rows, handleOnSelect } = this.props;
    selected.splice(selected.findIndex(i => i.uuid === item.uuid), 1);
    const new_rows = this.filterRowArray(selected, rows, value);
    handleOnSelect(selected);
    this.setState({
      selected,
      rows: new_rows,
      select_index: 0,
    });
  };

  handleOnMultiSelect = row => {
    const { selected, value } = this.state;
    const { rows, handleOnSelect } = this.props;
    const new_selected = this.filterSelectArray([...selected, row]);
    const new_rows = this.filterRowArray(new_selected, rows, value);
    handleOnSelect(new_selected);
    this.setState({
      selected: new_selected,
      rows: new_rows,
      select_index: 0,
    });
  };

  filterSelectArray = array =>
    Array.from(new Set(array.map(a => a.uuid))).map(uuid =>
      array.find(a => a.uuid === uuid),
    );

  filterRowArray = (selected, rows, value) => {
    const { row_key } = this.props;
    const selects_uuid = selected.map(select => select.uuid);

    return rows
      .filter(row => !selects_uuid.includes(row.uuid))
      .filter(row => this.containsStrings(row[row_key], value));
  };

  containsStrings = (string1 = '', string2 = '') =>
    string1
      .toString()
      .toLowerCase()
      .includes(string2.toString().toLowerCase());

  handleOnKeyDown = e => {
    const { selected, select_index, rows, key_codes, value } = this.state;
    if (
      e.keyCode === key_codes.down_arrow &&
      select_index !== rows.length - 1
    ) {
      this.setState({ select_index: select_index + 1 });
      return;
    }
    if (e.keyCode === key_codes.up_arrow && select_index !== 0) {
      this.setState({ select_index: select_index - 1 });
      return;
    }
    if (e.keyCode === key_codes.enter && rows.length > 0) {
      this.handleOnMultiSelect(rows[select_index]);
    }
    if (
      e.keyCode === key_codes.delete &&
      selected.length > 0 &&
      value.length === 0
    ) {
      this.handleOnRemove(selected[selected.length - 1]);
    }
  };

  render() {
    const {
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
      empty_text,
      bulk,
    } = this.props;
    const { selected, rows, value, select_index } = this.state;
    return (
      <DropdownContainer
        handleOnMultiSelect={this.handleOnMultiSelect}
        handleOnRemove={this.handleOnRemove}
        handleOnChange={this.handleOnChange}
        handleOnKeyDown={this.handleOnKeyDown}
        disabled={disabled}
        bulk={bulk}
        margin={margin}
        width={width}
        background={background}
        input={{
          component: InputMulti,
          value,
          label,
          selected,
          row_key,
          text_align,
          placeholder,
          left_icon,
          right_icon,
          type,
        }}
        component={SelectMulti}
        select={{
          rows,
          value,
          extended,
          select_index,
          select_title,
          row_key,
          empty_text,
          disabled,
        }}
      />
    );
  }
}
