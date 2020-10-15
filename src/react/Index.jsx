import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropType from 'prop-types';

import Header from './Header';
import Content from './Content';

import styles from './Index.less';

import { createStore } from '../reactRedux/tool';
import { Provider } from '../reactRedux/tool';
import ThemeReducer from './reducer/Index';

const store = createStore(ThemeReducer);

class Index extends Component {
  static childContextTypes = {
    store: PropType.object
  }

  getChildContext() {
    return { store };
  }

  render() {
    return <Provider store={{ store }} >
      <div className={styles['wrapper']} >
        <Header />
        <Content />
      </div>
    </Provider>;
  }
}

ReactDOM.render(
  <Index />,
  document.querySelector('#app')
);
