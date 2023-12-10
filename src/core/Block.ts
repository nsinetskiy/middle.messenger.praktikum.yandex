import { v4 as makeUUID } from 'uuid';
import { EventBus } from './EventBus';
import Handlebars from 'handlebars';

type Props = {
  [key: string]: unknown
}

type Embeddable = {
  embed: (fragment: DocumentFragment) => void
}

export class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_RENDER: 'flow:render',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_CWU: 'flow:component-will-unmount'
  };

  public id: string = makeUUID();
  protected props: Props;
  protected refs: Record<string, Block> = {};
  public children: Record<string, Block>;
  private eventBus: () => EventBus;
  private _element: HTMLElement | null = null;

  /** JSDoc
   * @param {string} tagName
   * @param {Object} props
   * 
   * @returns {void}
   */
  constructor(propsWithChildren: Props = {}) {
    const eventBus = new EventBus();
    const { props, children } = this._getChildrenAndProps(propsWithChildren);

    this.children = children;
    this.props = this._makePropsProxy(props);
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _getChildrenAndProps(childrenAndProps: Props) {
    const props: Props = {};
    const children: Record<string, Block> = {};

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { props, children };
  }

  _addEvents() {
    const { events = {} } = this.props as { events: Record<string, () => void> };

    Object.keys(events).forEach(eventName => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }

  _removeEvents() {
    const { events = {} } = this.props as { events: Record<string, () => void> };

    Object.keys(events).forEach(eventName => {
      this._element?.removeEventListener(eventName, events[eventName]);
    });
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CWU, this._componentWillUnmount.bind(this));
  }

  private _init() {
    this.init();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  protected init() {}

  _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount() {}

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    Object.values(this.children).forEach(child => {
      child.dispatchComponentDidMount();
    });
  }

  _componentWillUnmount() {
    this.componentWillUnmount();
    this._removeEvents();
  }

  componentWillUnmount() {}

  public dispatchComponentWillUnmount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CWU);
    Object.values(this.children).forEach(child => {
      child.dispatchComponentWillUnmount()
    });
    this._element?.remove();
  }

  private _componentDidUpdate() {
    if (this.componentDidUpdate()) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  protected componentDidUpdate() {
    return true;
  }

  setProps = (nextProps: Props) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  private _render() {
    const fragment = this.compile(this.render(), this.props);
    const newElement = fragment.firstElementChild as HTMLElement

    this._removeEvents();

    if (this._element) {
      this._element.replaceWith(newElement);
    }

    this._element = newElement;
    this._addEvents();
  }

  private compile(template: string, context: Props) {
    const contextAndStubs = { ...context, __children: [],  __refs: this.refs };
    const html = Handlebars.compile(template)(contextAndStubs);
    const temp = document.createElement('template');

    temp.innerHTML = html;
    contextAndStubs.__children?.forEach(({ embed }: Embeddable) => {
      embed(temp.content);
    });

    return temp.content;
  }

  protected render():string {
    return '';
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: Props) {
    const self = this;

    return new Proxy(props, {
      get(target: Props, prop: string) {
        const value = target[prop];

        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target: Props, prop: string, value: unknown) {
        const oldTarget = { ...target };

        target[prop] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);

        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      }
    });
  }

  public value() {}

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }
}

export default Block;
