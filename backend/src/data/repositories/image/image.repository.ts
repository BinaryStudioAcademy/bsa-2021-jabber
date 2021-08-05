import { Image as TImage, ImageCreatePayload } from '~/common/types/types';
import { ImageModel as ImageM } from '~/data/models/models';

type Constructor = {
  ImageModel: typeof ImageM;
};

class Image {
  #ImageModel: typeof ImageM;

  constructor({ ImageModel }: Constructor) {
    this.#ImageModel = ImageModel;
  }

  public create(payload: ImageCreatePayload): Promise<TImage> {
    return this.#ImageModel.query().insert(payload);
  }

  public get(id: number | null): Promise<TImage> | null {
    if (!id) {
      return null;
    }
    return this.#ImageModel.query().findById(id);
  }
}

export { Image };
