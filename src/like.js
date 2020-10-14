import { Component, mount } from './component';

class LikeButton extends Component {
  constructor(props) {
    super(props);
    
    this.state ={
      isLike: false
    };
  }

  onClick() {
    this.setState({
      isLike: !this.state.isLike,
    });
  }

  render() {    
    return `
      <button class="like-btn" style="background: ${this.props.bgColor};" >
        <span class="like-text" >${this.state.isLike ? '取消' : '点赞'}</span>
        <span>👍</span>
      </button>
    `;
  }
}

const wrapper = document.querySelector('.wrapper');

mount(new LikeButton({ bgColor: 'red' }), wrapper);
mount(new LikeButton({ bgColor: 'orange' }), wrapper);
