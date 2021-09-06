
import {
  PlaylistPayloadKey,
  ButtonType,
  DataStatus,
  AppRoute,
  ButtonColor,
} from 'common/enums/enums';
import { PlaylistFormPayload } from 'common/types/types';
import { useAppForm, useAppSelector } from 'hooks/hooks';
import {
  Input,
  Button,
  ImagePreviewControl,
} from 'components/common/common';
import { DEFAULT_PLAYLIST_PAYLOAD } from './common/constants';
import { playlistCreate as playlistCreateValidationSchema } from 'validation-schemas/validation-schemas';
import styles from './styles.module.scss';

type Props = {
  onSubmit: (payload: PlaylistFormPayload) => void;
};

const ConfiguratePlaylistForm: React.FC<Props> = ({
  onSubmit,
}) => {

  const { control, handleSubmit, errors } = useAppForm({
    validationSchema: playlistCreateValidationSchema,
    defaultValues: DEFAULT_PLAYLIST_PAYLOAD,
  });

  const { formDataStatus } = useAppSelector(
    ({ configuratePlaylist }) => ({
      formDataStatus: configuratePlaylist.formDataStatus,
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
          imageUrl={undefined}
          label="Playlist Cover"
        />
        <Input
          name={PlaylistPayloadKey.NAME}
          control={control}
          errors={errors}
          label="Playlist Name"
          placeholder="Enter Name"
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
