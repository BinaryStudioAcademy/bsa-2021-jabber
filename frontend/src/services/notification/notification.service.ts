import { BasicToastrOptions, toastr, ToastrEmitter } from 'react-redux-toastr';

class Notification {
  #instance: ToastrEmitter;

  constructor() {
    this.#instance = toastr;
  }

  public success(title: string, message: string, options?: BasicToastrOptions): void {
    this.#instance.success(title, message, options);
  }

  public info(title: string, message: string, options?: BasicToastrOptions): void {
    this.#instance.info(title, message, options);
  }

  public warning(title: string, message: string, options?: BasicToastrOptions): void {
    this.#instance.warning(title, message, options);
  }

  public error(title: string, message: string, options?: BasicToastrOptions): void {
    this.#instance.error(title, message, options);
  }
}

export { Notification };
