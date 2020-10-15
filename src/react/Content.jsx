import React, { Component } from 'react';

import { connect } from '../reactRedux/tool';

import ThemeSwitch from './ThemeSwitch';

class Content extends Component {  
  render() {
    return <div>
      <p style={{ color: this.props.themeColor }} >
        I am content.
      </p>

      <ThemeSwitch />
    </div>;
  }
}

const mapStateToProps = (state) => {
  return {
    themeColor: state.themeColor
  };
};

export default connect(mapStateToProps)(Content);
