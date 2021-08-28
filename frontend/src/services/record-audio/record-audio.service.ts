import { notification as notificationService } from '../services';
import { RecordStatus } from 'common/enums/enums';
import { TIME_SLICE } from './common/constants/constants';

type Constructor = {
  notificationService: typeof notificationService;
};

class RecordAudio {
  #notificationService;
  #recorder?: MediaRecorder;
  #audioChunks: Blob[] = [];
  #stream?: MediaStream;

  constructor({ notificationService }: Constructor) {
    this.#notificationService = notificationService;
  }

  private onSuccess(stream: MediaStream): void {
    this.#recorder = new MediaRecorder(stream);

    this.#stream = stream;

    this.#recorder.ondataavailable = ({ data }: BlobEvent): void => {
      this.#audioChunks.push(data);
    };

    this.#recorder.onpause = (): void => {
      stream.getTracks().forEach((track) => {
        track.enabled = false;
      });
    };

    this.#recorder.onresume = (): void => {
      stream.getTracks().forEach((track) => {
        track.enabled = true;
      });
    };

    this.#recorder.onstop = (): void => {
      stream.getTracks().forEach((track) => {
        track.stop();
      });
    };
  }

  private onError(err: MediaStreamError): void {
    this.#notificationService.error('Error', <string>err.message);
  }

  public start(): MediaStream | undefined {
    this.#recorder?.start(TIME_SLICE);

    return this.#stream;
  }

  public pause(): void {
    this.#recorder?.pause();
  }

  public resume(): void {
    this.#recorder?.resume();
  }

  public stop(): void {
    if (this.#recorder?.state !== RecordStatus.INACTIVE) {
      this.#recorder?.stop();
    }
  }

  public getLiveRecord(): Promise<Blob> {
    return new Promise((resolve, _reject) => {
      const audioBlob = new Blob(this.#audioChunks, { type: 'audio/wave' });

      this.#audioChunks = [];

      resolve(audioBlob);
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
