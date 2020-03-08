import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Loading } from 'components/loading/Loading';
import { Modals } from 'layout/modals/Modals';
import { Menu } from 'layout/navigation/Menu';
import { logoutUser as logoutUserAction } from 'ducks/actions';
import { Navigation } from 'layout/navigation/Navigation';
import cn from './Layouts.module.scss';
class ConnectedPrivateLayout extends PureComponent {
  static propTypes = {
    children: PropTypes.object,
    logoutUser: PropTypes.func,
    user: PropTypes.object,
    loading: PropTypes.bool,
  };

  render() {
    const { user, children, logoutUser, loading } = this.props;
    return (
      <div className={cn.privateContainer}>
        <Menu />
        <div className={cn.privateContent}>
          <Navigation user={user} logoutUser={logoutUser} />
          <div className={cn.page}>{children}</div>
          <p className={cn.version}>v {process.env.REACT_APP_VERSION}</p>
        </div>
        <Modals private_modals />
        {loading && <Loading variant="dark" />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.settings.loading,
  user: state.user,
});

const mapDispatchToProps = {
  logoutUser: logoutUserAction,
};

export const PrivateLayout = withRouter(connect(mapStateToProps, mapDispatchToProps)(ConnectedPrivateLayout));
