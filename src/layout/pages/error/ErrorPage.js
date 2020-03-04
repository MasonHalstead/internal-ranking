import React from 'react';
import { connect } from 'react-redux';
import cn from './ErrorPage.module.scss';
const { PUBLIC_URL } = process.env;

class ErrorPage extends React.PureComponent {
  render() {
    return (
      <div className={cn.page}>
        <img
          src={`${PUBLIC_URL}/404.png`}
          alt="Cognitiv 404 Error"
          height={400}
        />
        <div className={cn.notFoundContainer}>
          <h1>404</h1>
          <p className={cn.notFoundHeader}>Oops, looks like you are lost!</p>
          <p>
            The page you are trying to access doesnt exist. Please navigate your
            way back to a working page.
          </p>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {};

export default connect(null, mapDispatchToProps)(ErrorPage);
