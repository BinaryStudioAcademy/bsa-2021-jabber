import { Image as TImage, ImageCreatePayload } from '~/common/types/types';
import { image as imageRep } from '~/data/repositories/repositories';

type Constructor = {
  imageRepository: typeof imageRep;
};

class Image {
  #imageRepository: typeof imageRep;

  constructor({ imageRepository }: Constructor) {
    this.#imageRepository = imageRepository;
  }

  public create(payload: ImageCreatePayload): Promise<TImage> {
    return this.#imageRepository.create(payload);
  }
}

export { Image };
