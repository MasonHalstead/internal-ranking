import React from 'react';
import * as PropTypes from 'prop-types';
import cn from './Table.module.scss';

export const TableCell = React.memo(({ children, header }) => {
  const { flex_grow, min_width, show } = header;

  const cell_style = {
    minWidth: min_width,
    width: min_width,
    flexGrow: flex_grow || 0,
  };
  if (!show) {
    return null;
  }
  return (
    <div className={cn.tableCell} style={cell_style}>
      {children}
    </div>
  );
});

TableCell.defaultProps = {
  header: {},
};

TableCell.propTypes = {
  children: PropTypes.any,
  header: PropTypes.object,
};
