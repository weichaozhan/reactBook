import React, { Component } from 'react';

import { connect } from '../reactRedux/tool';

import styles from './Index.less';

class ThemeSwitch extends Component {
  clickBtn(themeColor) {
    this.props.onChangeColor(themeColor);
  }

  render() {
    return <div>
      <button className={styles['red-btn']} onClick={() => this.clickBtn('red')} >red</button>
      <button className={styles['blue-btn']} onClick={() => this.clickBtn('blue')} >blue</button>
    </div>;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeColor: (themeColor) => {
      dispatch({
        type: 'CHANGE_COLOR',
        themeColor: themeColor
      });
    }
  };
};

export default connect(undefined, mapDispatchToProps)(ThemeSwitch);
