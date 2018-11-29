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