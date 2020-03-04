import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import cn from './Table.module.scss';

export const TableHeaderCell = ({
  header_index,
  header,
  headers,
  handleSort,
}) => {
  const handleOnSort = (header_clicked, header_index_clicked) => {
    if (!header_clicked.sort) {
      return;
    }

    const new_headers = headers.map((item, index) => {
      if (index === header_index_clicked) {
        return {
          ...item,
          sort: header_clicked.sort === 'desc' ? 'asc' : 'desc',
        };
      }
      return {
        ...item,
        sort: item.sort && 'default',
      };
    });
    handleSort(new_headers[header_index_clicked], new_headers);
  };

  const { flex_grow, min_width, title, sort } = header;

  const header_style = {
    minWidth: min_width,
    width: min_width,
    flexGrow: flex_grow || 0,
  };

  if (!header.show) {
    return null;
  }

  return (
    <div
      className={classNames(cn.tableHeaderCell, { [cn.headerSort]: sort })}
      style={header_style}
      onClick={() => handleOnSort(header, header_index)}
    >
      {title}
      {sort && (
        <span>
          {sort === 'asc' && (
            <FontAwesomeIcon icon={['fas', 'sort-amount-up']} />
          )}
          {sort === 'desc' && (
            <FontAwesomeIcon icon={['fas', 'sort-amount-down']} />
          )}
          {sort === 'default' && (
            <>
              <FontAwesomeIcon icon={['fas', 'long-arrow-alt-up']} />
              <FontAwesomeIcon icon={['fas', 'long-arrow-alt-down']} />
            </>
          )}
        </span>
      )}
    </div>
  );
};

TableHeaderCell.defaultProps = {
  headers: [],
  header: {},
  handleSort() {},
  header_index: 0,
};

TableHeaderCell.propTypes = {
  handleSort: PropTypes.func,
  headers: PropTypes.array,
  header: PropTypes.object,
  header_index: PropTypes.number,
};
