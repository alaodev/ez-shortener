import type { ResponseError } from '@ez-shortener/exceptions';
import { io, type Socket } from 'socket.io-client';
import { resolveHeaders } from './headers';

export const useSocket = () => {
  let socket: Socket | null = null;

  const connect = (path: string, namespace = '') => {
    if (socket) return socket;
    const headers = resolveHeaders(path);
    socket = io(namespace, {
      path,
      transports: ['websocket'],
      withCredentials: true,
      query: headers,
    });
    socket.on('connect', () => {
      if (!socket) throw new Error('socket not connected');
      socket.emit('init');
    });
    socket.on('connect_error', (err) => {
      console.error('socket connection error:', err);
    });
    socket.on('error', (err: ResponseError) => {
      throw new Error(err.message);
    });
    return socket;
  };

  function on(event: string, callback: (...args: unknown[]) => void) {
    if (!socket) throw new Error('socket not connected');
    socket.on(event, callback);
  }

  function emit(event: string, data: unknown) {
    if (!socket) throw new Error('socket not connected');
    socket.emit(event, data);
  }

  function disconnect() {
    if (socket) {
      socket.disconnect();
      socket = null;
    }
  }

  return {
    connect,
    on,
    emit,
    disconnect,
  };
};
