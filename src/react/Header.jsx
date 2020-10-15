import React, { Component } from 'react';

import { connect } from '../reactRedux/tool';

class Header extends Component {
  render() {
    return <h1 style={{ color: this.props.themeColor, transition: 'all .3s' }} >
      I am header
    </h1>;
  }
}

const mapStateToProps = (state) => {
  return {
    themeColor: state?.themeColor
  };
};

export default connect(mapStateToProps)(Header);
