class Component {
    setState(state) {
        const oldEl = this.el
        this.state = state
        this._renderDOM()
        if (this.onChangeState) this.onChangeState(this.el, oldEl)
    }

    _renderDOM() {
        this.el = createDOMFromString(this.render)
        if (this.onClick) {
            this.el.addEventListener('click', this.onClick.bind(this))
        }
        return this.el
    }
}

const createDOMFromString = (domString) => {
    const div = document.createElement('div')

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