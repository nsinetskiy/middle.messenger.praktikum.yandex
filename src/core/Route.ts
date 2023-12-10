import Block from './Block';

function isEqual(lhs: string, rhs: string): boolean {
  return lhs === rhs;
}

function render(query: string, block: Block): HTMLElement {
  const root = document.querySelector(query) as HTMLElement;
  const content = block.getContent();

  if (root) {
    if (content) {
      root.append(content);
    } else {
      throw new Error('Не удалось отрисовать блок');
    }

    return root;
  }

  throw new Error('Корневой элемент не найден');
}

class Route {
  _pathname: string;
  _blockClass: typeof Block;
  _block: Block | null;
  _rootQuery: string;
  
  constructor(pathname: string, view: typeof Block, rootQuery: string) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._rootQuery = rootQuery;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.dispatchComponentWillUnmount();
      this._block = null;
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass();
      render(this._rootQuery, this._block);

      return;
    }
  }
}

export default Route;
