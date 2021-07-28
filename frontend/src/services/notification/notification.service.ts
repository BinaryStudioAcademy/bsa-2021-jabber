import { BasicToastrOptions, toastr, ToastrEmitter } from 'react-redux-toastr';

class Notification {
  #instance: ToastrEmitter;

  constructor() {
    this.#instance = toastr;
  }

  success(title: string, message: string, options?: BasicToastrOptions): void {
    this.#instance.success(title, message, options);
  }

  info(title: string, message: string, options?: BasicToastrOptions): void {
    this.#instance.info(title, message, options);
  }

  warning(title: string, message: string, options?: BasicToastrOptions): void {
    this.#instance.warning(title, message, options);
  }

  error(title: string, message: string, options?: BasicToastrOptions): void {
    this.#instance.error(title, message, options);
  }
}

export { Notification };
