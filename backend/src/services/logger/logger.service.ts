import pino from 'pino';
import { AsyncLocalStorage } from '~/services/async-storage/async-storage.service';
import { AppAsyncStorageKey, LogLevel } from '~/common/enums/enums';
import { AppAsyncStorage } from '~/common/types/types';

type Constructor = {
  asyncStorage: AsyncLocalStorage<AppAsyncStorage>;
  logLevel: LogLevel;
};

class Logger {
  #instance: pino.Logger;

  #asyncStorage: AsyncLocalStorage<AppAsyncStorage>;

  constructor({ asyncStorage, logLevel }: Constructor) {
    this.#asyncStorage = asyncStorage;
    this.#instance = pino({
      prettyPrint: true,
      level: logLevel,
    });
  }

  public error(message: string, stack?: string): void {
    this.#instance.error({ traceId: this.traceId }, message);

    if (stack) {
      this.#instance.error(stack);
    }
  }

  public log(message: string): void {
    return this.#instance.info({ traceId: this.traceId }, message);
  }

  public warn(message: string): void {
    return this.#instance.warn({ traceId: this.traceId }, message);
  }

  private get traceId(): string | null {
    const traceId = this.#asyncStorage
      .getStore()
      ?.get(AppAsyncStorageKey.TRACE_ID) as string | null;

    return traceId ?? null;
  }
}

export { Logger };
