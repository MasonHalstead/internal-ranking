import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { TextAreaBase } from './TextAreaBase';
import cn from './TextArea.module.scss';

const TextArea = ({
  component: TextAreaComponent,
  label,
  bulk,
  margin,
  background,
  width,
  disabled,
  handleOnChange,
  ...rest
}) => {
  const [focus, setFocus] = useState(false);

  const handleOnFocus = () => {
    setFocus(true);
  };

  const handleOnBlur = () => {
    setFocus(false);
  };

  return (
    <div className={cn.container} style={{ margin, width, background }}>
      {label && <p className={cn.label}>{label}</p>}
      <div
        className={classNames(cn.textContainer, {
          [cn.textBulk]: bulk,
          [cn.textDisabled]: disabled,
          [cn.textFocus]: focus,
        })}
      >
        <TextAreaComponent
          {...rest}
          handleOnChange={e => handleOnChange(e.target)}
          handleOnBlur={handleOnBlur}
          handleOnFocus={handleOnFocus}
        />
      </div>
    </div>
  );
};

TextArea.defaultProps = {
  label: '',
  value: '',
  placeholder: '',
  disabled: false,
  margin: '0px',
  background: 'transparent',
  width: '100%',
  bulk: false,
  component: TextAreaBase,
  handleClose() {},
  handleOnFocus() {},
  handleToggle() {},
  handleOnChange() {},
  handleOnKeyDown() {},
};

TextArea.propTypes = {
  component: PropTypes.any,
  label: PropTypes.string,
  left_icon: PropTypes.any,
  right_icon: PropTypes.any,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.any,
  bulk: PropTypes.bool,
  margin: PropTypes.string,
  background: PropTypes.string,
  width: PropTypes.string,
  handleOnKeyDown: PropTypes.func,
  handleClose: PropTypes.func,
  handleOnFocus: PropTypes.func,
  handleToggle: PropTypes.func,
  handleOnChange: PropTypes.func,
};

export default TextArea;
