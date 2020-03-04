import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { formatNull, containsStrings, compareJSON } from 'utils/helpers';
import { TableDefault } from './TableDefault';
import { TableHeader } from './TableHeader';

function handleSearchFilter(props) {
  const { rows, settings, search_input } = props;
  const { search_key } = settings;
  if (search_key) {
    return rows.filter(row => containsStrings(row[search_key], search_input));
  }
  return rows;
}

function handleSortingFilter(props) {
  const { rows, sort_key, sort } = props;
  if (!sort_key) {
    return rows;
  }
  if (sort === 'desc') {
    return rows.sort((a, b) =>
      formatNull(a[sort_key])
        .toString()
        .toLowerCase() <
      formatNull(b[sort_key])
        .toString()
        .toLowerCase()
        ? 1
        : -1,
    );
  }
  if (sort === 'asc') {
    return rows.sort((a, b) =>
      formatNull(a[sort_key])
        .toString()
        .toLowerCase() >
      formatNull(b[sort_key])
        .toString()
        .toLowerCase()
        ? 1
        : -1,
    );
  }
  return rows;
}

function handleKeywordFilter(props) {
  const { rows, settings, keywords } = props;
  const { keyword_key } = settings;

  if (keyword_key) {
    return rows.filter(row =>
      keywords.every(key => {
        const key_check = formatNull(key);
        const keyword_check = formatNull(row[keyword_key]);
        return containsStrings(keyword_check, key_check);
      }),
    );
  }
  return rows;
}

function handlePaginationFilter(props) {
  const { rows_length, settings, current_page } = props;
  const { pagination } = settings;

  let start_page = 0;
  let end_page = 0;

  const total_pages = Math.ceil(rows_length / pagination);
  if (current_page < 1 || current_page > total_pages || !pagination) {
    return {};
  }

  const page = current_page || 1;
  if (total_pages <= 10) {
    start_page = 1;
    end_page = total_pages;
  } else if (page <= 6) {
    start_page = 1;
    end_page = 10;
  } else if (page + 4 >= total_pages) {
    start_page = total_pages - 9;
    end_page = total_pages;
  } else {
    start_page = total_pages - 5;
    end_page = total_pages + 4;
  }

  // calculate start and end item indexes
  const start_index = (page - 1) * pagination;
  const end_index = Math.min(start_index + pagination - 1);
  // create an array of pages to ng-repeat in the pager control
  const pages = [...Array(end_page + 1 - start_page).keys()].map(
    i => start_page + i,
  );
  return {
    total_pages,
    current_page: page,
    start_index,
    end_index,
    pages,
  };
}

export class Table extends Component {
  static propTypes = {
    callbacks: PropTypes.object,
    headers: PropTypes.array,
    keywords: PropTypes.array,
    handleSubmit: PropTypes.func,
    search_input: PropTypes.string,
    header_component: PropTypes.any,
    cell_components: PropTypes.array,
    table_component: PropTypes.any,
    settings: PropTypes.object,
    rows: PropTypes.array,
  };

  static defaultProps = {
    headers: [],
    rows: [],
    header_component: TableHeader,
    table_component: TableDefault,
    handleSubmit: () => {},
    keywords: [],
    callbacks: {},
    settings: {},
    search_input: '',
  };

  state = {
    headers: [],
    headers_data: [],
    rows: [],
    pages: [],
    total_pages: 1,
    current_page: 1,
    start_index: 0,
    end_index: 1,
    sort_key: false,
    sort: 'desc',
  };

  componentDidMount() {
    const { rows } = this.props;
    this.setState({ rows });
  }

  static getDerivedStateFromProps(props, state) {
    const { keywords, search_input, rows, headers } = props;
    const { sort_key, sort, headers_data } = state;
    const { settings } = props;

    if (!compareJSON(headers_data, headers)) {
      return {
        headers_data: props.headers,
        headers: props.headers,
      };
    }
    const search_filter_rows = handleSearchFilter({
      rows,
      settings,
      search_input,
    });

    const keyword_filter_rows = handleKeywordFilter({
      rows: search_filter_rows,
      settings,
      keywords,
    });

    const sort_filter_rows = handleSortingFilter({
      rows: keyword_filter_rows,
      sort_key,
      sort,
    });

    const pagination = handlePaginationFilter({
      rows_length: sort_filter_rows.length,
      current_page: state.current_page,
      settings,
    });
    return { rows: [...sort_filter_rows], ...pagination };
  }

  handleSort = (header, headers) => {
    const { sort_key, sort } = header;
    this.setState({ headers, sort_key, sort, current_page: 1 });
  };

  handlePagination = current_page => {
    const { rows } = this.state;
    const { settings } = this.props;
    const pagination = handlePaginationFilter({
      rows_length: rows.length,
      settings,
      current_page,
    });
    this.setState(pagination);
  };

  render() {
    const {
      headers,
      pages,
      current_page,
      total_pages,
      start_index,
      end_index,
    } = this.state;
    const {
      settings,
      callbacks,
      handleSubmit,
      header_component,
      cell_components,
      table_component: TableComponent,
    } = this.props;
    let { rows } = this.state;
    if (settings.pagination) {
      rows = rows.slice(start_index, end_index + 1);
    }
    return (
      <TableComponent
        headers={headers}
        rows={rows}
        callbacks={callbacks}
        header_component={header_component}
        cell_components={cell_components}
        settings={{
          ...settings,
          pages,
          current_page,
          total_pages,
          start_index,
          end_index,
        }}
        handleSubmit={handleSubmit}
        handleSort={this.handleSort}
        handlePagination={this.handlePagination}
      />
    );
  }
}
