import { JSDOM } from 'jsdom';

const jsdom = new JSDOM(`<body><div id="app"></div></body>`, {url: 'https://example.com/'});

global.window = jsdom.window;
global.document = jsdom.window.document;
global.Node = jsdom.window.Node;
global.MouseEvent = jsdom.window.MouseEvent;
