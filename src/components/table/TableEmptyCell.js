import React from 'react';
import * as PropTypes from 'prop-types';
import cn from './Table.module.scss';

export const TableEmptyCell = React.memo(({ header }) => {
  const { flex_grow, min_width, show } = header;

  const cell_style = {
    minWidth: min_width,
    width: min_width,
    flexGrow: flex_grow || 0,
  };
  if (!show) {
    return null;
  }
  return <div className={cn.tableCell} style={cell_style} />;
});

TableEmptyCell.defaultProps = {
  header: {},
};

TableEmptyCell.propTypes = {
  header: PropTypes.object,
};
