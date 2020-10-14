function renderTitle(newTitle, oldTitle = {}) {
  if (newTitle === oldTitle) return;

  const titleDom = document.querySelector('#title');
  
  titleDom.innerHTML = newTitle.text;
  titleDom.style.color = newTitle.color;
}

function renderContent(newContent, oldContent = {}) {
  if (newContent === oldContent) return;
  
  const contentDom = document.querySelector('#content');

  contentDom.innerHTML = newContent.text;
  contentDom.style.color = newContent.color;
}

function renderApp(newAppState, oldAppState = {}) {
  if (newAppState === oldAppState) return;

  renderTitle(newAppState.title, oldAppState.title);
  renderContent(newAppState.content, oldAppState.content);
}

function stateChanger(state = {
  title: {
    text: 'title',
    color: 'skyblue'
  },
  content: {
    text: 'content',
    color: 'gray'
  }
}, action) {
  switch(action.type) {
    case 'UPDATE_TITLE_TEXT':
      return {
        ...state,
        title: {
          ...state.title,
          text: action.text
        }
      };
    case 'UPDATE_TITLE_COLOR':
      return {
        ...state,
        title: {
          ...state.title,
          color: action.color
        }
      };
    default:
      return state;
  }
}

function createStore(reducer) {
  let state = undefined;
  const listeners = [];
  const subscribe = listener => listeners.push(listener);
  const getState = () => state;
  const dispatch = action => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };

  dispatch({});

  return {
    getState,
    dispatch,
    subscribe
  };
}

const store = createStore(stateChanger);
let oldState = store.getState();

renderApp(oldState);

store.subscribe(() => {
  const newState = store.getState();
  renderApp(newState);
  oldState = newState;
});

setTimeout(() => {
  store.dispatch({ type: 'UPDATE_TITLE_TEXT', text: '修改后的 title' });
  
  setTimeout(() => {
    store.dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'red' });
  }, 1000);
}, 1000);
