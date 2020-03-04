import React from 'react';
import * as PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import classNames from 'classnames';
import cn from './Select.module.scss';

export const SelectMulti = ({
  rows,
  select_title,
  select_index,
  row_key,
  empty_text,
  extended,
  top,
  left,
  right,
  bulk,
  width,
  handleSelectMulti,
}) => (
  <Scrollbars
    className={classNames(cn.selectScroll, { [cn.selectBulk]: bulk })}
    autoHeight
    autoHeightMin={30}
    autoHeightMax={200}
    style={{ minWidth: width, left, right, top }}
  >
    <div className={cn.selectWrapper}>
      {select_title && <p className={cn.selectTitle}>{select_title}</p>}
      {rows.length > 0 &&
        rows.map((row, index) => (
          <p
            key={row.uuid}
            className={classNames(cn.item, {
              [cn.itemSelected]: index === select_index,
            })}
            role="presentation"
            onClick={() => handleSelectMulti(row)}
          >
            {row[row_key]}
          </p>
        ))}
      {rows.length === 0 && <p className={cn.empty}>{empty_text}</p>}
      {extended.length > 0 && (
        <>
          <div className={cn.extendedBreak} />
          <div className={cn.extended}>
            {extended.map(ext => (
              <p
                key={ext.uuid}
                className={cn.item}
                role="presentation"
                onClick={() => handleSelectMulti(ext)}
              >
                {ext[row_key]}
              </p>
            ))}
          </div>
        </>
      )}
    </div>
  </Scrollbars>
);

SelectMulti.defaultProps = {
  rows: [],
  select_index: 0,
  extended: [],
  row_key: 'uuid',
  select_title: '',
  bulk: false,
  width: 'auto',
  top: 'auto',
  left: 0,
  right: 0,
  empty_text: 'Nothing returned',
  handleSelectMulti: () => {},
};
SelectMulti.propTypes = {
  rows: PropTypes.array,
  extended: PropTypes.array,
  select_index: PropTypes.number,
  select_title: PropTypes.string,
  row_key: PropTypes.string,
  bulk: PropTypes.bool,
  width: PropTypes.any,
  top: PropTypes.any,
  left: PropTypes.any,
  right: PropTypes.any,
  empty_text: PropTypes.string,
  handleSelectMulti: PropTypes.func,
};
