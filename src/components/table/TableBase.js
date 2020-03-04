import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import { TableRows } from './TableRows';
import { TableFooter } from './TableFooter';
import { TableHeader } from './TableHeader';
import { TableHeaderCell } from './TableHeaderCell';
import { TableRow } from './TableRow';
import cn from './Table.module.scss';

export class TableBase extends Component {
  rowsRef = React.createRef();

  static propTypes = {
    callbacks: PropTypes.object,
    headers: PropTypes.array,
    headers_component: PropTypes.any,
    header_component: PropTypes.any,
    rows_component: PropTypes.any,
    row_component: PropTypes.any,
    cell_components: PropTypes.array,
    footer_component: PropTypes.any,
    creative_groups: PropTypes.array,
    settings: PropTypes.object,
    rows: PropTypes.array,
    handleSort: PropTypes.func,
  };

  static defaultProps = {
    headers: [],
    rows: [],
    callbacks: {},
    settings: {},
    creative_groups: [],
    handleSort: () => {},
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
    height: 62, // default value header + row
  };

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  }

  componentDidUpdate() {
    const { height } = this.state;
    if (this.rowsRef.current) {
      // Need to fix this implementation
      const dim = this.rowsRef.current.getBoundingClientRect();
      if (height !== dim.height) {
        this.handleHeight(dim.height);
      }
    }
  }

  static getDerivedStateFromProps(props, state) {
    return {
      ...state,
      ...props.settings,
    };
  }

  handleHeight = height => {
    this.setState({ height });
  };

  handleResize = () => {
    if (this.rowsRef.current) {
      const dim = this.rowsRef.current.getBoundingClientRect();
      this.setState({ height: dim.height });
    }
  };

  render() {
    const {
      handleSort,
      callbacks,
      creative_groups,
      headers,
      headers_component,
      header_component: Header,
      rows,
      rows_component: Rows,
      row_component: Row,
      cell_components,
      footer_component: Footer,
    } = this.props;
    const { height, header_height, row_height } = this.state;
    const settings = { ...this.state };
    return (
      <div
        className={cn.table}
        style={{
          minHeight: row_height + header_height,
          height: 'auto',
          maxHeight: rows.length * row_height + header_height,
        }}
      >
        <Header
          headers_component={headers_component}
          headers={headers}
          settings={settings}
          handleSort={handleSort}
        />
        <div className={cn.rows} ref={this.rowsRef}>
          <Scrollbars
            className={cn.scroll}
            autoHeight
            autoHeightMin={row_height}
            autoHeightMax={height}
          >
            <Rows
              headers={headers}
              rows={rows}
              settings={settings}
              callbacks={callbacks}
              creative_groups={creative_groups}
              row_component={Row}
              cell_components={cell_components}
            />
          </Scrollbars>
        </div>
        <Footer settings={settings} callbacks={callbacks} />
      </div>
    );
  }
}
