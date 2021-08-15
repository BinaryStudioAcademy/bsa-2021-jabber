import { FileStorage } from '~/services/file-storage/file-storage.service';
import { image as imageRep } from '~/data/repositories/repositories';

type Constructor = {
  imageRepository: typeof imageRep;
  fileStorage: FileStorage;
};

class Image {
  #fileStorage: FileStorage;
  #imageRepository: typeof imageRep;

  constructor({ imageRepository, fileStorage }: Constructor) {
    this.#fileStorage = fileStorage;
    this.#imageRepository = imageRepository;
  }

  public async delete(id: number): Promise<void> {
    const image = await this.#imageRepository.getById(id);

    await this.#imageRepository.delete(id);
    await this.#fileStorage.delete(image.publicId);
  }
}

export { Image };
