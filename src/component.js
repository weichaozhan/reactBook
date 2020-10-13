const createDOMFromString = (domstring) => {
  const template = document.createElement('template');

  template.innerHTML = domstring;
  
  return template.content.querySelector('*');
};

export class Component {
  constructor(props) {
    this.props = props ? { ...props } : {};
  }

  setState(stateUpdate) {
    const oldEL = this.el;

    this.state = {
      ...this.state,
      ...stateUpdate,
    };
    this.el = this._renderDOM();

    this.onStateChange && (this.onStateChange(oldEL, this.el));
  }

  _renderDOM() {
    this.el = createDOMFromString(this.render());

    if (this.onClick) {
      this.el.addEventListener('click', () => this.onClick());
    }

    return this.el;
  }
}

export const mount = (component, wrapper) => {
  wrapper.appendChild(component._renderDOM());
  component.onStateChange = (oldEL, newEl) => {
    wrapper.insertBefore(newEl, oldEL);
    wrapper.removeChild(oldEL);
  };
};
