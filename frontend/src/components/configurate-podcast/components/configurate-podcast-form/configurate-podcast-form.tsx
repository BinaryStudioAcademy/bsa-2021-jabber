import { getOptions } from 'helpers/helpers';
import {
  PodcastPayloadKey,
  ButtonType,
  DataStatus,
  PodcastType,
  AppRoute,
  ButtonColor,
  PodcastPeriodicity,
} from 'common/enums/enums';
import { Option, PodcastFormPayload } from 'common/types/types';
import { useAppForm, useAppSelector } from 'hooks/hooks';
import {
  Input,
  Button,
  Select,
  ImagePreviewControl,
} from 'components/common/common';
import { DEFAULT_PODCAST_PAYLOAD } from './common/constants';
import { podcastCreate as podcastCreateSchema } from 'validation-schemas/validation-schemas';
import { sortGenresByName } from '../../helpers/helpers';
import styles from './styles.module.scss';

type Props = {
  onSubmit: (payload: PodcastFormPayload) => void;
  payload?: PodcastFormPayload;
  genres: Option[];
};

const selectOptions: Option[] = getOptions(Object.values(PodcastType));
const periodicityOptions: Option[] = getOptions(Object.values(PodcastPeriodicity));

const ConfiguratePodcastForm: React.FC<Props> = ({
  onSubmit,
  payload = DEFAULT_PODCAST_PAYLOAD,
  genres,
}) => {
  const { control, handleSubmit, errors } = useAppForm({
    validationSchema: podcastCreateSchema,
    defaultValues: payload,
  });

  const { savePodcastStatus, podcast } = useAppSelector(
    ({ configuratePodcast }) => ({
      savePodcastStatus: configuratePodcast.saveDataStatus,
      podcast: configuratePodcast.podcast,

    }),
  );

  const isFormDisabled = savePodcastStatus === DataStatus.PENDING;

  const sortedGenres = sortGenresByName(genres);

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
          isDisabled={isFormDisabled}
        />
        <Select
          options={selectOptions}
          label="Type"
          name={PodcastPayloadKey.TYPE}
          control={control}
          errors={errors}
          isDisabled={isFormDisabled}
        />
        <Select
          options={periodicityOptions}
          label="Рeriodicity"
          name={PodcastPayloadKey.PERIODICITY}
          control={control}
          errors={errors}
          isDisabled={isFormDisabled}
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
            className={styles.button}
            label="Save"
            type={ButtonType.SUBMIT}
          />
          <Button
            className={styles.button}
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
