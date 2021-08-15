import { notification as notificationService } from '../services';
import { RecordStatus } from 'common/enums/enums';

type Constructor = {
  notificationService: typeof notificationService;
};

class RecordAudio {
  #notificationService;
  #recorder?: MediaRecorder;
  #audioChunks: Blob[] = [];

  constructor({ notificationService }: Constructor) {
    this.#notificationService = notificationService;
  }

  private onSuccess(stream: MediaStream): void {
    this.#recorder = new MediaRecorder(stream);

    this.#recorder.ondataavailable = ({ data }: BlobEvent): void => {
      this.#audioChunks.push(data);
    };
  }

  private onError(err: MediaStreamError): void {
    this.#notificationService.error('Error', <string>err.message);
  }

  public start(): void {
    this.#recorder?.start(500);
  }

  public pause(): void {
    this.#recorder?.pause();
  }

  public resume(): void {
    this.#recorder?.resume();
  }

  public stop(): Promise<string> {
    return new Promise((resolve, _reject) => {

      if (this.#recorder?.state !== RecordStatus.INACTIVE) {
        this.#recorder?.stop();
        const audioBlob = new Blob(this.#audioChunks, { type: 'audio/wave' });
        this.#audioChunks = [];
        resolve(URL.createObjectURL(audioBlob));
      }
    });
  }

  public init(): void {
    navigator.getUserMedia(
      { audio: true },
      (stream) => this.onSuccess(stream),
      (err) => this.onError(err));
  }
}

export { RecordAudio };
