import sinon, { SinonStub } from 'sinon';
import { HTTPTransport, METHOD } from './HTTPTransport';
import { expect } from 'chai';

describe('HTTPTransport', () => {
  let httpTransport: HTTPTransport;
  let requestStub: SinonStub;
  let expectedResult: string;

  beforeEach(() => {
    httpTransport = new HTTPTransport();
    requestStub = sinon.stub(httpTransport, 'request').resolves();
    expectedResult = '/test?a=1&b=2';
  });

  afterEach(() => {
    sinon.restore();
  });

  it('должен преобразовывать в строку объект, где все параметры - строки', () => {
    const options = { data: { a: '1', b: '2' } };

    httpTransport.get('/test', options);

    expect(requestStub.calledWithMatch(expectedResult, {method: METHOD.GET})).to.be.true;
  });

  it('должен преобразовывать в строку объект, где параметрами могут быть и строки, и числа', () => {
    const options = { data: { a: 1, b: '2' } };

    httpTransport.get('/test', options);
    
    expect(requestStub.calledWithMatch(expectedResult, {method: METHOD.GET})).to.be.true;
  });

  it('должен преобразовывать в строку объект, где все параметры - числа', () => {
    const options = { data: { a: 1, b: 2 } };

    httpTransport.get('/test', options);
    
    expect(requestStub.calledWithMatch(expectedResult, {method: METHOD.GET})).to.be.true;
  });

  it('должен корректно обрабатывать случаи, когда дополнительные данные не переданы', () => {
    const options = {};

    expectedResult = '/test';

    httpTransport.get('/test', options);
    
    expect(requestStub.calledWithMatch(expectedResult, {method: METHOD.GET})).to.be.true;
  });
})
