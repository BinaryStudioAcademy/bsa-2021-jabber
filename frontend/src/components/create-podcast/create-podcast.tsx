import { PodcastCreatePayload } from 'common/types/types';
import { ButtonType, DataStatus } from 'common/enums/enums';
import { podcast as podcastActions } from 'store/actions';
import { useAppForm, useAppSelector, useDispatch } from 'hooks/hooks';
import { Input, Button } from 'components/common/common';
import styles from './styles.module.scss';
import { podcast as podcastSchema } from 'validation-schemas/validation-schemas';
import { DEFAULT_PODCAST_PAYLOAD } from './common/constants';
import logoCut from 'assets/img/logo-cut.svg';

const CreatePodcast: React.FC = () => {
  const { control, handleSubmit, errors } = useAppForm({
    validationSchema: podcastSchema,
    defaultValues: DEFAULT_PODCAST_PAYLOAD,
  });

  const { createPodcastStatus } = useAppSelector(({ configuratePodcast }) => ({
    createPodcastStatus: configuratePodcast.dataStatus,
  }));
  const dispatch = useDispatch();

  const isFormDisabled = createPodcastStatus === DataStatus.PENDING;

  const onSubmit = (data: PodcastCreatePayload): void => {
    dispatch(podcastActions.create(data));
  };

  return (
    <div>
      <form
        className={styles.createPodcastWrapper}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={styles.content}>
          <div className={styles.contentLeft}>
            <fieldset disabled={isFormDisabled} className={styles.fieldset}>
              <p>
                <Input
                  label="Podcast name"
                  name="name"
                  control={control}
                  errors={errors}
                />
              </p>
            </fieldset>
          </div>
          <div>
            <img src={logoCut} />
          </div>
        </div>
        <p>
          <Button label="Save" type={ButtonType.SUBMIT} />
        </p>
      </form>
    </div>
  );
};

export default CreatePodcast;
