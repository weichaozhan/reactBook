const appState = {
  title: {
    text: 'title',
    color: 'skyblue'
  },
  content: {
    text: 'content',
    color: 'gray'
  }
};

function renderTitle(title) {
  const titleDom = document.querySelector('#title');
  
  titleDom.innerHTML = title.text;
  titleDom.style.color = title.color;
}

function renderContent(content) {
  const contentDom = document.querySelector('#content');

  contentDom.innerHTML = content.text;
  contentDom.style.color = content.color;
}

function renderApp(appState) {
  renderTitle(appState.title);
  renderContent(appState.content);
}

function stateChanger(state, action) {
  switch(action.type) {
    case 'UPDATE_TITLE_TEXT':
      state.title.text = action.text;
      break;
    case 'UPDATE_TITLE_COLOR':
      state.title.color = action.color;
      break;
    default:
      break;
  }
}

function createStore(state, stateChanger) {
  const listeners = [];
  const subscribe = listener => listeners.push(listener);
  const getState = () => state;
  const dispatch = action => {
    stateChanger(state, action);
    listeners.forEach(listener => listener());
  };
  return {
    getState,
    dispatch,
    subscribe
  };
}

const store = createStore(appState, stateChanger);

renderApp(store.getState());

store.subscribe(() => renderApp(store.getState()));
setTimeout(() => {
  store.dispatch({ type: 'UPDATE_TITLE_TEXT', text: '修改后的 title' });
  store.dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'red' });
}, 1000);
