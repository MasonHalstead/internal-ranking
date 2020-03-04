import React from 'react';
import * as PropTypes from 'prop-types';
import cn from './Input.module.scss';

export const InputFake = ({
  placeholder,
  value,
  text_align,
  handleOnFocus,
}) => (
  <div onClick={handleOnFocus} className={cn.inputFake}>
    {placeholder && !value && (
      <p className={cn.placeholder} style={{ textAlign: text_align }}>
        {placeholder}
      </p>
    )}
    {value && <p style={{ textAlign: text_align }}>{value}</p>}
  </div>
);
InputFake.defaultProps = {
  placeholder: 'Select...',
  text_align: 'left',
  value: '',
  handleOnFocus: () => {},
};
InputFake.propTypes = {
  handleOnFocus: PropTypes.func,
  text_align: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};
