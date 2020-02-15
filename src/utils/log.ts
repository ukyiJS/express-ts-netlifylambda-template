import 'colors';
import consola, { Consola } from 'consola';
import Color from '../interfaces/color';

export const LOG = 'log';
export const INFO = 'info';
export const WARN = 'warn';
export const SUCCESS = 'success';
export const READY = 'ready';
export const ERROR = 'error';

export default function log(methods: keyof Consola = LOG) {
  return (message: string, type?: string, colorType?: keyof Color) => {
    let color: keyof Color = 'white';

    if (methods === INFO) color = 'cyan';
    if (methods === SUCCESS || methods === READY) color = 'green';
    if (methods === WARN) color = 'yellow';
    if (methods === ERROR) color = 'red';

    const option = { message: message[colorType || color], badge: true, type };

    consola[methods](option);
  };
}
