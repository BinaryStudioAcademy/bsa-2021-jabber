import { getOptions } from 'helpers/helpers';
import {
  PodcastPayloadKey,
  ButtonType,
  DataStatus,
  PodcastType,
  AppRoute,
  ButtonColor,
} from 'common/enums/enums';
import { Option, PodcastFormPayload } from 'common/types/types';
import { useAppForm, useAppSelector } from 'hooks/hooks';
import { Input, Button, Select, ImagePreviewControl } from 'components/common/common';
import { DEFAULT_PODCAST_PAYLOAD } from './common/constants';
import { podcastCreate as podcastCreateSchema } from 'validation-schemas/validation-schemas';
import styles from './styles.module.scss';

type Props = {
  onSubmit: (payload: PodcastFormPayload) => void;
  payload?: PodcastFormPayload;
  genres: Option[];
};

const selectOptions: Option[] = getOptions(Object.values(PodcastType));

const ConfiguratePodcastForm: React.FC<Props> = ({
  onSubmit,
  payload = DEFAULT_PODCAST_PAYLOAD,
  genres,
}) => {
  const { control, handleSubmit, errors } = useAppForm({
    validationSchema: podcastCreateSchema,
    defaultValues: payload,
  });

  const { createPodcastStatus, podcast } = useAppSelector(({ configuratePodcast }) => ({
    createPodcastStatus: configuratePodcast.dataStatus,
    podcast: configuratePodcast.podcast,
  }));

  const isFormDisabled = createPodcastStatus === DataStatus.PENDING;

  const sortedGenres = [...genres].sort((a, b) => a.label > b.label ? 1 : -1);

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <fieldset disabled={isFormDisabled} className={styles.fieldset}>
        <ImagePreviewControl
          name={PodcastPayloadKey.IMAGE}
          control={control}
          errors={errors}
          imageUrl={podcast?.image?.url}
          label="Podcast Image"
          className={styles.imagePreview}
        />
        <ImagePreviewControl
          name={PodcastPayloadKey.COVER}
          control={control}
          errors={errors}
          imageUrl={podcast?.cover?.url}
          label="Podcast Cover"
        />
        <Input
          name={PodcastPayloadKey.NAME}
          control={control}
          errors={errors}
          label="Podcast Name"
          placeholder="Enter Name"
        />
        <Select
          options={sortedGenres}
          label="Genre"
          name={PodcastPayloadKey.GENRE}
          control={control}
          errors={errors}
        />
        <Select
          options={selectOptions}
          label="Type"
          name={PodcastPayloadKey.TYPE}
          control={control}
          errors={errors}
        />
        <Input
          name={PodcastPayloadKey.DESCRIPTION}
          control={control}
          errors={errors}
          label="Description"
          placeholder="Enter description podcast"
          hasMultipleRows
        />
        <div className={styles.btnsWrapper}>
          <Button
            className={styles.btnSave}
            label="Save"
            type={ButtonType.SUBMIT}
          />
          <Button
            className={styles.btnCancel}
            buttonColor={ButtonColor.LIGHT_PINK}
            label="Cancel"
            type={ButtonType.SUBMIT}
            href={AppRoute.ROOT}
          />
        </div>
      </fieldset>
    </form>
  );
};

export default ConfiguratePodcastForm;
