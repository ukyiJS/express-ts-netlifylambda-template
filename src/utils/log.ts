import 'colors';
import consola from 'consola';

export const INFO = (message: string) => consola.info({ message: message.cyan, badge: true });
export const ERROR = (message: string) => consola.error({ message: message.red, badge: true });
export const SUCCESS = (message: string) => consola.success({ message: message.green, badge: true });
export const READY = (message: string) => consola.ready({ message: message.green, badge: true });
