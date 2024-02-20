import { WSTransport, WSTransportEvents } from '../core/WSTransport';

import type { Message, CurrentChat } from '../types';

const connectWebSocket = (userId: number, chatId: number, token: string, data: CurrentChat) => {
  const webSocket = new WSTransport(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);

  webSocket.connect().then(() => {
    webSocket.send({
      content: '0',
      type: 'get old'
    });
  });
  webSocket.on(WSTransportEvents.Message, (receivedData) => {
    const eventData = receivedData as Message;

    if (eventData.type !== 'pong' && eventData.type !== 'user connected') {
      if (Array.isArray(eventData)) {
        data.messages = eventData.reverse();
      } else {
        data.messages = data.messages!.concat(eventData);
      }
      
      data.webSocket = webSocket;
      window.store.set({ activeChat: data });

      const chatBody = document.querySelector('.current-chat__body')?.lastElementChild;

      chatBody?.scrollIntoView({ block: 'end', behavior: 'smooth' });
    }
  });
};
const sendMessage = (message: string) => {
  const webSocket = window.store.getState().activeChat?.webSocket;

  webSocket && webSocket.send({
    content: message,
    type: 'message'
  });
};
const closeWebSocketConnection = () => {
  const webSocket = window.store.getState().activeChat?.webSocket;

  webSocket && webSocket.close();
};

export {
  connectWebSocket,
  sendMessage,
  closeWebSocketConnection
}
