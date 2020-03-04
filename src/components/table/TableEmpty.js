import React from 'react';
import PropTypes from 'prop-types';
import cn from './Table.module.scss';

export const TableEmpty = ({ settings }) => {
  const { header, row_height } = settings;

  if (!header) {
    return null;
  }

  const rows_style = {
    minHeight: `${row_height}px`,
    maxHeight: `${row_height}px`,
  };

  return (
    <div className={cn.tableRow} style={rows_style}>
      <div className={cn.tableCell}>
        <p className={cn.empty}>No Available Strategies</p>
      </div>
    </div>
  );
};

TableEmpty.propTypes = {
  settings: PropTypes.object,
};
