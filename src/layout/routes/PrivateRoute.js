import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { selectPrivateUser } from 'ducks/selectors';
import { routes } from 'layout/routes/routes';
import { PrivateLayout } from 'layout/layouts/PrivateLayout';

class PrivateRouteWrapper extends PureComponent {
  static propTypes = {
    privateUser: PropTypes.bool,
    component: PropTypes.object,
    variant: PropTypes.string,
    layout: PropTypes.any,
    location: PropTypes.object,
  };

  render() {
    const { component: Component, privateUser, variant, location, ...rest } = this.props;
    if (privateUser) {
      return (
        <Route
          key={location.pathname}
          {...rest}
          render={props => (
            <Redirect
              to={{
                pathname: routes.ROOT,
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
          <PrivateLayout variant={variant}>
            <Component {...props} />
          </PrivateLayout>
        )}
      />
    );
  }
}
const mapStateToProps = state => ({
  privateUser: selectPrivateUser(state),
});

export const PrivateRoute = withRouter(connect(mapStateToProps)(PrivateRouteWrapper));
