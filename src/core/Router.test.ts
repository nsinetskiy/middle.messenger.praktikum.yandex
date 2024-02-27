import Router from './Router';
import Route from './Route';
import Block, { IBlockProps } from './Block';
import { expect } from 'chai';
import sinon from 'sinon';

describe('Router', () => {
  let router: Router;
  let PageComponent: typeof Block;
  let YetAnotherPageComponent: typeof Block;

  before(() => {
    class Component extends Block {
      constructor(props: IBlockProps) {
        super({
          ...props
        });
      }

      protected render(): string {
        return `<div>{{text}}</div>`
      }
    }

    class YetAnotherComponent extends Block {
      constructor(props: IBlockProps) {
        super({
          ...props
        });
      }

      protected render(): string {
        return `<div>{{newText}}</div>`
      }
    }

    PageComponent = Component;
    YetAnotherPageComponent = YetAnotherComponent;
  });

  beforeEach(() => {
    router = new Router('#app');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('должен принимать путь и компонент страницы и добавлять их в массив маршрутов', () => {
    router.use('/page', PageComponent);

    expect(router.routes).to.have.lengthOf(1);
    expect(router.routes[0]).to.be.an.instanceOf(Route);
    expect(router.routes[0].blockClass).to.be.eq(PageComponent);
  });

  it('должен менять состояние сущности history при переходе на новую страницу', () => {
    router.use('/test', PageComponent);
    router.use('/new-test', YetAnotherPageComponent);
    router.go('/test');
    router.go('/new-test');

    expect(router.history.length).to.be.eq(3);
  });

  it('должен переходить назад по истории', () => {
    const goBack = sinon.stub(window.history, 'back');

    router.back();

    expect(goBack.calledOnce).to.be.true;
  });

  it('должен переходить вперёд по истории', () => {
    const goForward = sinon.stub(window.history, 'forward');

    router.forward();

    expect(goForward.calledOnce).to.be.true;
  });
});
