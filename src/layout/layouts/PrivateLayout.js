import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Loading } from 'components/loading/Loading';
import { Modals } from 'layout/modals/Modals';
import cn from './Layouts.module.scss';
class ConnectedPrivateLayout extends PureComponent {
  static propTypes = {
    children: PropTypes.object,
    loading: PropTypes.bool,
  };

  render() {
    const { children, loading } = this.props;
    return (
      <div className={cn.privateContainer}>
        <p>navigation here</p>
        <div className={cn.privateContent}>{children}</div>
        <p className={cn.version}>v {process.env.REACT_APP_VERSION}</p>
        <Modals private_modals />
        {loading && <Loading variant="dark" />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.settings.loading,
});

export const PrivateLayout = withRouter(connect(mapStateToProps)(ConnectedPrivateLayout));
