class Component {
    constructor(props = {}) {
        this.props = props
    }
    setState(state) {
        const oldEl = this.el
        this.state = state
        this._renderDOM()
        if (this.onChangeState) this.onChangeState(this.el, oldEl)
    }

    _renderDOM() {
        this.el = createDOMFromString(this.render())
        if (this.onClick) {
            this.el.addEventListener('click', this.onClick.bind(this))
        }
        return this.el
    }
}

const createDOMFromString = (domString) => {
    const div = document.createElement('span')

    div.innerHTML = domString
    return div
}

const mount = (component, wrapper) => {
    wrapper.appendChild(component._renderDOM())
    component.onChangeState = (el, oldEl) => {
        wrapper.insertBefore(el, oldEl)
        wrapper.removeChild(oldEl)
    }
}

class LikeButton extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLiked: false,
        }
    }

    onClick() {
        this.setState({
            isLiked: !this.state.isLiked
        })
    }

    render() {
        return `
        <button class="like-btn">
            <span class="like-text">${this.state.isLiked ? '取消' : '点赞'}</span>
            <span>👍</span>
        </button>
        `
    }
}

const wrapper = document.querySelector('.wrapper')

mount(new LikeButton(), wrapper)
mount(new LikeButton(), wrapper)