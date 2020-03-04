import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from '../buttons/Button';
import cn from './Table.module.scss';

export const TableFooter = React.memo(
  ({ handlePagination, handleSubmit, rows, settings }) => {
    const {
      current_page,
      total_pages,
      pagination,
      bulk_edit,
      submit_text,
      pages,
    } = settings;
    if (rows.length === 0) {
      return null;
    }
    return (
      <div className={cn.footerContainer}>
        {pagination && pages.length > 1 && (
          <div className={cn.pagination}>
            <p
              className={classNames({ [cn.disabled]: current_page === 1 })}
              role="presentation"
              onClick={() => handlePagination(1)}
            >
              First
            </p>
            <p
              className={classNames({ [cn.disabled]: current_page === 1 })}
              role="presentation"
              onClick={() => handlePagination(current_page - 1)}
            >
              <FontAwesomeIcon icon="chevron-left" />
            </p>
            {pages.map(page => (
              <p
                key={page}
                className={classNames({ [cn.active]: current_page === page })}
                role="presentation"
                onClick={() => handlePagination(page)}
              >
                {page}
              </p>
            ))}
            <p
              className={classNames({
                [cn.disabled]: current_page === total_pages,
              })}
              role="presentation"
              onClick={() => handlePagination(current_page + 1)}
            >
              <FontAwesomeIcon icon="chevron-right" />
            </p>
            <p
              className={classNames({
                [cn.disabled]: current_page === total_pages,
              })}
              role="presentation"
              onClick={() => handlePagination(total_pages)}
            >
              Last
            </p>
          </div>
        )}
        <div className={cn.flex} />
        {bulk_edit && (
          <Button
            width="auto"
            variant="slim"
            onClick={() => handleSubmit(rows)}
          >
            {submit_text}
          </Button>
        )}
      </div>
    );
  },
);

TableFooter.propTypes = {
  rows: PropTypes.object,
  handlePagination: PropTypes.func,
  handleSubmit: PropTypes.func,
  settings: PropTypes.object,
};
