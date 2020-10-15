export default (state = {
  themeColor: 'red'
}, action) => {
  switch(action.type) {
    case 'CHANGE_COLOR':
      return {
        ...state,
        themeColor: action.themeColor
      };
    default:
      return state;
  }
}
