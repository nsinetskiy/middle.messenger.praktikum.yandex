import Block from '../../core/Block';
import template from './api-alert-line.hbs?raw'
import './api-alert-line.scss';

export class ApiAlertLine extends Block {
  protected render(): string {
    return template;
  }
}
