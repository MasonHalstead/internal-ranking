import React from 'react';
import * as PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import classNames from 'classnames';
import cn from './Select.module.scss';

export const Select = ({
  rows,
  select_title,
  selected_index,
  selected,
  row_key,
  empty_text,
  extended,
  top,
  left,
  right,
  bulk,
  width,
  handleSelect,
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
        rows.map((row, i) => (
          <p
            key={row.uuid}
            className={classNames(cn.item, {
              [cn.itemSelected]: row[row_key] === selected,
              [cn.itemActive]: i === selected_index,
            })}
            role="presentation"
            onClick={() => handleSelect(row)}
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
                onClick={() => handleSelect(ext)}
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

Select.defaultProps = {
  rows: [],
  extended: [],
  row_key: 'uuid',
  select_title: '',
  selected: '',
  selected_index: 0,
  bulk: false,
  width: 'auto',
  top: 'auto',
  left: 0,
  right: 0,
  empty_text: 'Nothing returned',
  handleSelect: () => {},
};
Select.propTypes = {
  rows: PropTypes.array,
  extended: PropTypes.array,
  select_title: PropTypes.string,
  top: PropTypes.any,
  left: PropTypes.any,
  right: PropTypes.any,
  selected: PropTypes.any,
  selected_index: PropTypes.any,
  row_key: PropTypes.string,
  bulk: PropTypes.bool,
  width: PropTypes.any,
  empty_text: PropTypes.string,
  handleSelect: PropTypes.func,
};
