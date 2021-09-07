import {
  PlaylistPayloadKey,
  ButtonType,
  DataStatus,
  AppRoute,
  ButtonColor,
  PlaylistStatus,
} from 'common/enums/enums';
import { PlaylistFormPayload, Option } from 'common/types/types';
import { useAppForm, useAppSelector } from 'hooks/hooks';
import {
  Input,
  Button,
  Select,
  ImagePreviewControl,
} from 'components/common/common';
import { DEFAULT_PLAYLIST_PAYLOAD } from './common/constants';
import { playlistCreate as playlistCreateValidationSchema } from 'validation-schemas/validation-schemas';
import styles from './styles.module.scss';
import { getOptions } from 'helpers/helpers';

type Props = {
  onSubmit: (payload: PlaylistFormPayload) => void;
  payload?: PlaylistFormPayload;
};

const statusOptions: Option[] = getOptions(Object.values(PlaylistStatus));

const ConfiguratePlaylistForm: React.FC<Props> = ({
  onSubmit,
  payload = DEFAULT_PLAYLIST_PAYLOAD,
}) => {

  const { control, handleSubmit, errors } = useAppForm({
    validationSchema: playlistCreateValidationSchema,
    defaultValues: payload,
  });

  const { formDataStatus, playlist } = useAppSelector(
    ({ configuratePlaylist }) => ({
      formDataStatus: configuratePlaylist.formDataStatus,
      playlist: configuratePlaylist.playlist,
    }),
  );

  const isFormDisabled = formDataStatus === DataStatus.PENDING;

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <fieldset disabled={isFormDisabled} className={styles.fieldset}>
        <ImagePreviewControl
          name={PlaylistPayloadKey.COVER}
          control={control}
          errors={errors}
          imageUrl={playlist?.cover?.url}
          label="Playlist Cover"
        />
        <Input
          name={PlaylistPayloadKey.NAME}
          control={control}
          errors={errors}
          label="Playlist Name"
          placeholder="Enter Name"
        />
        <Select
          options={statusOptions}
          label="Status"
          name={PlaylistPayloadKey.STATUS}
          control={control}
          errors={errors}
          isDisabled={isFormDisabled}
        />
        <Input
          name={PlaylistPayloadKey.DESCRIPTION}
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
            href={AppRoute.ROOT}
          />
        </div>
      </fieldset>
    </form>
  );
};

export default ConfiguratePlaylistForm;
