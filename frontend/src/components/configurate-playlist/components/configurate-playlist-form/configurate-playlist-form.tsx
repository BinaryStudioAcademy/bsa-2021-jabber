
import {
  PlaylistPayloadKey,
  ButtonType,
  DataStatus,
  AppRoute,
  ButtonColor,
  PlaylistStatus,
} from 'common/enums/enums';
import { PlaylistFormPayload, Option } from 'common/types/types';
import { useAppForm, useAppSelector, useEffect } from 'hooks/hooks';
import {
  Input,
  Button,
  ImagePreviewControl, Select,
} from 'components/common/common';
import { DEFAULT_PLAYLIST_PAYLOAD } from './common/constants';
import { playlistCreate as playlistCreateValidationSchema } from 'validation-schemas/validation-schemas';
import styles from './styles.module.scss';
import { getOptions, getRandomId } from 'helpers/helpers';

type Props = {
  onSubmit: (payload: PlaylistFormPayload) => void;
};

const ConfiguratePlaylistForm: React.FC<Props> = ({
  onSubmit,
}) => {

  const { control, handleSubmit, errors, setValue, watch } = useAppForm({
    validationSchema: playlistCreateValidationSchema,
    defaultValues: DEFAULT_PLAYLIST_PAYLOAD,
  });

  const { formDataStatus } = useAppSelector(
    ({ configuratePlaylist }) => ({
      formDataStatus: configuratePlaylist.formDataStatus,
    }),
  );

  const isFormDisabled = formDataStatus === DataStatus.PENDING;
  const selectTypeOptions: Option[] = getOptions(Object.values(PlaylistStatus));
  const isPlaylistPrivate = watch(PlaylistPayloadKey.STATUS) === PlaylistStatus.PRIVATE;

  const handleGenerateCode = (): void => {
    setValue(PlaylistPayloadKey.INVITATION_CODE, getRandomId());
  };

  useEffect(() => {
    if (!isPlaylistPrivate) {
      setValue(PlaylistPayloadKey.INVITATION_CODE, '');
    }
  }, [isPlaylistPrivate]);

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
        <Select
          options={selectTypeOptions}
          label="Type"
          name={PlaylistPayloadKey.STATUS}
          control={control}
          errors={errors}
          isDisabled={isFormDisabled}
        />
        {isPlaylistPrivate &&
        (<div className={styles.invitationCode}>
          <Input
            name={PlaylistPayloadKey.INVITATION_CODE}
            control={control}
            errors={errors}
            label="Invitation code"
            placeholder="Generate new code"
          />
          <Button label="Generate" onClick={handleGenerateCode} />
        </div>)}
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
