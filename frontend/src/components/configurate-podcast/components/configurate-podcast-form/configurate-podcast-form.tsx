import { PodcastCreatePayloadKey } from 'common/enums/enums';
import { PodcastCreatePayload } from 'common/types/types';
import { ButtonType, DataStatus } from 'common/enums/enums';
import { useAppForm, useAppSelector } from 'hooks/hooks';
import { Input, Button } from 'components/common/common';
import { podcast as podcastSchema } from 'validation-schemas/validation-schemas';
import styles from './styles.module.scss';
import { DEFAULT_PODCAST_PAYLOAD } from './common/constants';

import { useRef, useState } from 'react';
import { imageApi } from 'services/services';

type Props = {
  onSubmit: (payload: PodcastCreatePayload) => void;
};

const ConfiguratePodcastForm: React.FC<Props> = ({ onSubmit }) => {
  const { control, handleSubmit, errors } = useAppForm({
    validationSchema: podcastSchema,
    defaultValues: DEFAULT_PODCAST_PAYLOAD,
  });

  const { createPodcastStatus } = useAppSelector(({ configuratePodcast }) => ({
    createPodcastStatus: configuratePodcast.dataStatus,
  }));

  const isFormDisabled = createPodcastStatus === DataStatus.PENDING;

  //------------------------------------------------------------------------------------

  const [cover, setCover] = useState('');
  const inputFileRef = useRef(null);
  const handleCoverUpload = (): void => {
    const inputFile = inputFileRef.current as unknown as HTMLInputElement;
    const file = inputFile?.files?.[0];
    // eslint-disable-next-line no-console
    console.dir(file);

    if (file) {
      imageApi
        .uploadImage(file)
        .then(({ url }) => {
          // eslint-disable-next-line no-console
          console.log(url);
          setCover(url);
        })
        .catch((err) => err);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset disabled={isFormDisabled} className={styles.fieldset}>
          <Input
            name={PodcastCreatePayloadKey.NAME}
            control={control}
            errors={errors}
            label="Podcast name"
            placeholder="Name"
          />
          <Button label="Save" type={ButtonType.SUBMIT} />
        </fieldset>
      </form>
      <div>
        <input type="file" ref={inputFileRef} />
        <button onClick={handleCoverUpload}>Upload Cover</button>
        <img
          src={cover ? cover : 'https://via.placeholder.com/150'}
          alt="image"
        />
      </div>
    </>
  );
};

export default ConfiguratePodcastForm;
