import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { TableFooter } from 'components/table/TableFooter';
import { TableRows } from 'components/table/TableRows';
import { TableHeader } from './TableHeader';
import { TableHeaderCell } from './TableHeaderCell';
import { TableRow } from './TableRow';
import cn from './Table.module.scss';

export class TableDefault extends Component {
  rowsRef = React.createRef();

  static propTypes = {
    callbacks: PropTypes.object,
    headers: PropTypes.array,
    headers_component: PropTypes.any,
    header_component: PropTypes.any,
    rows_component: PropTypes.any,
    row_component: PropTypes.any,
    footer_component: PropTypes.any,
    cell_components: PropTypes.array,
    settings: PropTypes.object,
    rows: PropTypes.array,
    handleSort: PropTypes.func,
    handlePagination: PropTypes.func,
    handleSubmit: PropTypes.func,
  };

  static defaultProps = {
    headers: [],
    rows: [],
    callbacks: {},
    settings: {},
    handleSort: () => {},
    handlePagination: () => {},
    handleSubmit: () => {},
    headers_component: TableHeaderCell,
    header_component: TableHeader,
    rows_component: TableRows,
    row_component: TableRow,
    footer_component: TableFooter,
  };

  state = {
    table_height: 62, // default value header + row
    header: true,
    header_height: 32,
    row_height: 30,
    search_key: false,
    keyword_key: false,
    row_length: 1,
    pagination: null,
    pages: [],
    total_pages: 1,
    current_page: 1,
    start_index: 0,
    end_index: 0,
    bulk_edit: false,
    submit_text: 'Submit',
    height: 62, // default value header + row
  };

  static getDerivedStateFromProps(props, state) {
    return {
      ...state,
      ...props.settings,
    };
  }

  render() {
    const {
      handleSort,
      handlePagination,
      handleSubmit,
      callbacks,
      headers,
      headers_component,
      header_component: Header,
      rows,
      rows_component: Rows,
      row_component: Row,
      footer_component: Footer,
      cell_components,
    } = this.props;
    const settings = { ...this.state };
    return (
      <>
        <div className={cn.table}>
          <Header
            headers_component={headers_component}
            headers={headers}
            settings={settings}
            handleSort={handleSort}
          />
          <Rows
            headers={headers}
            rows={rows}
            settings={settings}
            callbacks={callbacks}
            row_component={Row}
            cell_components={cell_components}
          />
        </div>
        <Footer
          rows={rows}
          settings={settings}
          handleSubmit={handleSubmit}
          handlePagination={handlePagination}
        />
      </>
    );
  }
}
