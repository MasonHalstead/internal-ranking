import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from './Modal.module.scss';

export const Modal = ({ show, handleClose, variant, children, width }) => {
  const node = useRef();
  const handleClickOutside = e => {
    if (node.current.contains(e.target)) {
      return;
    }
    handleClose();
  };

  useEffect(() => {
    if (show) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });
  return (
    <>
      {show && (
        <div className={cn.modal}>
          <div className={cn.content} ref={node} style={{ minWidth: width, maxWidth: width }}>
            <div className={cn.close} onClick={handleClose}>
              <FontAwesomeIcon className={cn[variant]} icon="times" />
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

Modal.defaultProps = {
  width: '500px',
  show: false,
  variant: 'primary',
  handleClose: () => {},
};

Modal.propTypes = {
  width: PropTypes.string,
  show: PropTypes.bool,
  variant: PropTypes.string,
  children: PropTypes.any,
  handleClose: PropTypes.func,
};
