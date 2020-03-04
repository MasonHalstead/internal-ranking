import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Modals } from 'layout/modals/Modals';
import { Loading } from 'components/loading/Loading';
import cn from './Layouts.module.scss';

export class ConnectedPublicLayout extends React.PureComponent {
  static propTypes = {
    children: PropTypes.object,
    loading: PropTypes.bool,
  };

  render() {
    const { children, loading } = this.props;
    return (
      <div className={cn.publicContainer}>
        {children}
        <Modals />
        {loading && <Loading variant="dark" />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.settings.loading,
});

export const PublicLayout = withRouter(connect(mapStateToProps)(ConnectedPublicLayout));
