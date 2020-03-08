import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { InputBase } from './InputBase';
import cn from './Input.module.scss';

export class Input extends Component {
  static propTypes = {
    component: PropTypes.any,
    label: PropTypes.string,
    left_icon: PropTypes.any,
    right_icon: PropTypes.any,
    placeholder: PropTypes.string,
    dropdown: PropTypes.bool,
    dropdown_focus: PropTypes.bool,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    value: PropTypes.any,
    bulk: PropTypes.bool,
    error: PropTypes.bool,
    margin: PropTypes.string,
    flexGrow: PropTypes.number,
    background: PropTypes.string,
    width: PropTypes.string,
    select_focus: PropTypes.bool,
    handleOnKeyDown: PropTypes.func,
    handleClose: PropTypes.func,
    handleOnBlur: PropTypes.func,
    handleOnFocus: PropTypes.func,
    handleToggle: PropTypes.func,
    handleOnChange: PropTypes.func,
  };

  static defaultProps = {
    label: '',
    value: '',
    placeholder: '',
    dropdown: false,
    dropdown_focus: false,
    error: false,
    disabled: false,
    left_icon: false,
    right_icon: false,
    type: 'text',
    margin: '0px',
    flexGrow: 1,
    background: 'transparent',
    width: '100%',
    bulk: false,
    select_focus: false,
    component: InputBase,
    handleClose() {},
    handleOnBlur() {},
    handleOnFocus() {},
    handleToggle() {},
    handleOnChange() {},
    handleOnKeyDown() {},
  };

  state = {
    focus: false,
  };

  handleDataMask = input => {
    const { handleOnChange } = this.props;
    handleOnChange({
      value: input.value,
      masked: input.formattedValue,
      raw: input.floatValue,
    });
  };

  handleOnFocus = () => {
    const { handleOnFocus } = this.props;
    this.setState({ focus: true });
    handleOnFocus();
  };

  handleOnBlur = () => {
    this.setState({ focus: false });
  };

  handleOnChange = e => {
    const { handleOnChange } = this.props;
    if (!e.target) {
      this.handleDataMask(e);
      return;
    }
    handleOnChange({ value: e.target.value });
  };

  render() {
    const {
      component: InputComponent,
      label,
      left_icon,
      right_icon,
      bulk,
      error,
      margin,
      background,
      width,
      disabled,
      flexGrow,
      ...rest
    } = this.props;
    let { focus } = this.state;
    const { dropdown, dropdown_focus } = this.props;
    if (dropdown) {
      focus = dropdown_focus;
    }
    return (
      <div className={cn.container} style={{ margin, maxWidth: width, width, background, flexGrow }}>
        {label && <p className={cn.label}>{label}</p>}
        <div
          className={classNames(cn.inputContainer, {
            [cn.inputBulk]: bulk,
            [cn.inputDisabled]: disabled,
            [cn.inputFocus]: focus,
            [cn.inputError]: error,
          })}
        >
          {left_icon && (
            <div className={cn.leftIcon} onClick={this.props.handleToggle}>
              <FontAwesomeIcon icon={left_icon} />
            </div>
          )}
          <InputComponent
            {...rest}
            handleOnChange={this.handleOnChange}
            handleOnBlur={this.handleOnBlur}
            handleOnFocus={this.handleOnFocus}
          />
          {right_icon && (
            <div className={cn.rightIcon} onClick={this.props.handleToggle}>
              <FontAwesomeIcon icon={right_icon} />
            </div>
          )}
        </div>
      </div>
    );
  }
}
