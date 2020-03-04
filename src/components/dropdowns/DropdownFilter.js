import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { DropdownContainer } from './DropdownContainer';
import { InputBase } from '../inputs/InputBase';

export class DropdownFilter extends Component {
  static propTypes = {
    label: PropTypes.string,
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
  };

  static defaultProps = {
    label: '',
    value: '',
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
    select_title: '',
    empty_text: 'Nothing returned',
    handleOnSelect: () => {},
  };

  state = {
    value: '',
    selected_index: 0,
    rows: [],
    key_codes: {
      down_arrow: 40,
      up_arrow: 38,
      enter: 13,
      delete: 8,
    },
  };

  componentDidMount = () => {
    const { value, rows } = this.props;
    this.setState({
      value,
      rows,
    });
  };

  searchFilter = () => {
    const { value } = this.state;
    const { row_key, rows } = this.props;

    if (row_key === null || value === null) {
      this.setState({ rows });
      return;
    }
    this.setState({
      rows: rows.filter(row =>
        row[row_key]
          .toString()
          .toLowerCase()
          .includes(value.toString().toLowerCase()),
      ),
    });
  };

  handleOnSelect = row => {
    const { rows } = this.state;
    const { handleOnSelect, row_key } = this.props;
    this.setState({
      selected_index: rows.findIndex(filter => filter.id === row.id),
      value: row[row_key],
    });
    handleOnSelect(row);
  };

  handleOnKeyDown = e => {
    const { selected_index, key_codes, rows } = this.state;

    if (
      e.keyCode === key_codes.down_arrow &&
      selected_index !== rows.length - 1
    ) {
      this.setState({ selected_index: selected_index + 1 });
      return;
    }
    if (e.keyCode === key_codes.up_arrow && selected_index !== 0) {
      this.setState({ selected_index: selected_index - 1 });
      return;
    }
    if (e.keyCode === key_codes.enter && rows.length > 0) {
      this.handleOnSelect(rows[selected_index]);
    }
  };

  handleOnChange = async input => {
    await this.setState({
      value: input.value,
      selected_index: 0,
    });
    this.searchFilter();
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
      bulk,
      empty_text,
    } = this.props;
    const { value, rows, selected_index } = this.state;
    return (
      <DropdownContainer
        handleOnSelect={this.handleOnSelect}
        handleOnChange={this.handleOnChange}
        handleOnKeyDown={this.handleOnKeyDown}
        disabled={disabled}
        margin={margin}
        bulk={bulk}
        width={width}
        background={background}
        input={{
          component: InputBase,
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
          selected_index,
          row_key,
          empty_text,
          disabled,
        }}
      />
    );
  }
}
