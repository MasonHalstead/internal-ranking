import React from 'react';
import * as PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import cn from './Button.module.scss';

export const Button = React.memo(({ children, margin, width, left_icon, right_icon, variant, disabled, onClick }) => (
  <button className={classNames(cn.button, cn[variant])} disabled={disabled} style={{ width, margin }} onClick={onClick} type="submit">
    {left_icon && <FontAwesomeIcon className={cn.leftIcon} icon={left_icon} />}
    {children}
    {right_icon && <FontAwesomeIcon className={cn.rightIcon} icon={right_icon} />}
  </button>
));
Button.defaultProps = {
  left_icon: false,
  right_icon: false,
  width: '100%',
  margin: '0px',
  variant: 'primary',
  disabled: false,
  onClick: () => {},
};
Button.propTypes = {
  disabled: PropTypes.any,
  margin: PropTypes.string,
  variant: PropTypes.string,
  left_icon: PropTypes.any,
  right_icon: PropTypes.any,
  width: PropTypes.any,
  children: PropTypes.any,
  onClick: PropTypes.func,
};
