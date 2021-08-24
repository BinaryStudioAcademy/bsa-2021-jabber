import { History, LocationDescriptor, LocationState } from 'history';
import { AppRoute } from 'common/enums/enums';

type Constructor = {
  history: History;
};

class Navigation {
  #history: History;

  constructor({ history }: Constructor) {
    this.#history = history;
  }

  public push(path: AppRoute | string | LocationDescriptor<LocationState>): void {
    this.#history.push(path);
  }

  public get instance(): History {
    return this.#history;
  }
}

export { Navigation };
