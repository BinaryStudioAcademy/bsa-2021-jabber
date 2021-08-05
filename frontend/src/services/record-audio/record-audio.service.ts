import { notification as notificationService } from '../services';
import { RecordStatus } from 'common/enums/enums';

type Constructor = {
  notificationService: typeof notificationService;
};

class RecordAudio {
  #notificationService;
  #recorder?: MediaRecorder;
  #audioChunks: Blob[] = [];
  #audioDataUrl = '';

  constructor({ notificationService }: Constructor) {
    this.#notificationService = notificationService;
  }

  private onSuccess(stream: MediaStream): void {
    this.#recorder = new MediaRecorder(stream);

    this.#recorder.ondataavailable = ({ data }: BlobEvent): void => {
      this.#audioChunks.push(data);
    };
  }

  private onError(e: MediaStreamError): void {
    this.#notificationService.error('Error', <string>e.message);
  }

  public start(): void {
    this.#recorder?.start();
  }

  public pause(): void {
    this.#recorder?.pause();
  }

  public resume(): void {
    this.#recorder?.resume();
  }

  public stop(): string {
    if (this.#recorder?.state !== RecordStatus.INACTIVE) {
      this.#recorder?.stop();
      const audioBlob = new Blob(this.#audioChunks);
      this.#audioDataUrl = URL.createObjectURL(audioBlob);
    }
    return this.#audioDataUrl;
  }

  public init(): void {
    navigator.getUserMedia(
      { audio: true },
      (stream) => this.onSuccess(stream),
      (e) => this.onError(e));
  }
}

export { RecordAudio };
