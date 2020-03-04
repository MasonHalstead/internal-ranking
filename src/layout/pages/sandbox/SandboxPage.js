import React from 'react';
import { connect } from 'react-redux';

export class SandboxPage extends React.PureComponent {
  render() {
    return <div>sandbox something</div>;
  }
}

const mapDispatchToProps = {};

export default connect(null, mapDispatchToProps)(SandboxPage);
