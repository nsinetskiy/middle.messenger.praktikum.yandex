import Block, { IBlockProps } from './Block';
import { expect } from 'chai';
import sinon from 'sinon';

describe('Block', () => {
  let PageComponent: typeof Block;

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

    PageComponent = Component;
  });

  afterEach(() => {
    sinon.restore();
  });

  it('должен отрисоваться с заданными свойствами', () => {
    const text = 'Test';
    const pageComponent = new PageComponent({ text });
    const renderedText = pageComponent.element?.innerHTML;

    expect(renderedText).to.be.eq(text);
  });

  it('должен перерисовываться при изменении свойств', () => {
    const text = 'New text';
    const pageComponent = new PageComponent({ text: 'Test' });

    pageComponent.setProps({ text });

    const renderedText = pageComponent.element?.innerHTML;

    expect(renderedText).to.be.eq(text);
  });

  it('должен добавлять события на эелементе', () => {
    const handlerStub = sinon.stub();
    const pageComponent = new PageComponent({
      events: {
        click: handlerStub
      }
    });
    const event = new MouseEvent('click');

    pageComponent.element?.dispatchEvent(event);

    expect(handlerStub.calledOnce).to.be.true;
  });

  it('должен вызывать метод dispatchComponentDidMount после добавления в DOM', () => {
    const clock = sinon.useFakeTimers();
    const pageComponent = new PageComponent();
    const spyCDM = sinon.spy(pageComponent, 'componentDidMount');
    const element = pageComponent.getContent();

    document.body.append(element!);
    clock.next();

    expect(spyCDM.calledOnce).to.be.true;
  });
});
