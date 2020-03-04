import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { selectPrivateUser } from 'ducks/selectors';
import { routes } from 'layout/routes/routes';
import { PublicLayout } from 'layout/layouts/PublicLayout';

class ConnectedPublicRoute extends PureComponent {
  static propTypes = {
    privateUser: PropTypes.bool,
    component: PropTypes.object,
    layout: PropTypes.any,
    location: PropTypes.object,
  };

  render() {
    const { component: Component, privateUser, location, ...rest } = this.props;
    if (privateUser) {
      return (
        <Route
          key={location.pathname}
          {...rest}
          render={props => (
            <Redirect
              to={{
                pathname: routes.GAMES,
                state: {
                  from: props.location,
                },
              }}
            />
          )}
        />
      );
    }
    return (
      <Route
        key={location.pathname}
        {...rest}
        render={props => (
          <PublicLayout>
            <Component {...props} />
          </PublicLayout>
        )}
      />
    );
  }
}
const mapStateToProps = state => ({
  privateUser: selectPrivateUser(state),
});

export const PublicRoute = withRouter(connect(mapStateToProps)(ConnectedPublicRoute));
