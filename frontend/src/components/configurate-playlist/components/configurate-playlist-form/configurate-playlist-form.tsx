
import {
  PlaylistPayloadKey,
  ButtonType,
  DataStatus,
  AppRoute,
  ButtonColor,
} from 'common/enums/enums';
import { PodcastFormPayload } from 'common/types/types';
import { useAppForm, useAppSelector } from 'hooks/hooks';
import {
  Input,
  Button,
} from 'components/common/common';
import { DEFAULT_PLAYLIST_PAYLOAD } from './common/constants';
import { playlist as playlistValidationSchema } from 'validation-schemas/validation-schemas';
import styles from './styles.module.scss';

type Props = {
  onSubmit: (payload: PodcastFormPayload) => void;
};

const ConfiguratePlaylistForm: React.FC<Props> = ({
  onSubmit,
}) => {

  const { control, handleSubmit, errors } = useAppForm({
    validationSchema: playlistValidationSchema,
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
        <Input
          name={PlaylistPayloadKey.NAME}
          control={control}
          errors={errors}
          label="Playlist Name"
          placeholder="Enter Name"
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

export default ConfiguratePlaylistForm;
