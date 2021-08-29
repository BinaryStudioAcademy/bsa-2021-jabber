import { webmFixDuration } from 'webm-fix-duration';

const getBlobDuration = (blob: Blob, duration: number): Promise<Blob> => {
  return webmFixDuration(blob, duration);
};

export { getBlobDuration };
