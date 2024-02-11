import { IBlockProps, Block } from '../../core/Block';
import template from './button.hbs?raw';
import './button.scss';

interface IProps extends IBlockProps {
  mod?: string,
  text: string,
  onClick?: (e: Event) => void
}

export class Button extends Block {
  constructor(props: IProps) {
    super({
      ...props,
      events: {
        click: (e: Event) => {
          e.preventDefault();
          
          if (props.onClick) {
            props.onClick(e);
          }
        }
      }
    });
  }

  protected render(): string {
    return (template);
  }
}
