import { useForm, FieldValues } from 'react-hook-form';
import { PodcastCreatePayload } from 'common/types/types';
// import { joiResolver } from '@hookform/resolvers/joi';
import { ButtonType, DataStatus } from 'common/enums/enums';
import { podcast as podcastActions } from 'store/actions';
import { useAppSelector, useDispatch } from 'hooks/hooks';
import { Input, Button } from 'components/common/common';
import styles from './styles.module.scss';

const CreatePodcast: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { name: '', userId: 2 },

    // resolver: joiResolver(SignupSchema),
    mode: 'onSubmit',
  });

  const { createPodcastStatus } = useAppSelector(({ podcast }) => ({
    createPodcastStatus: podcast.dataStatus,
  }));
  const dispatch = useDispatch();

  const isFormDisabled = createPodcastStatus === DataStatus.PENDING;

  const onSubmit = (data: PodcastCreatePayload): void => {
    // eslint-disable-next-line no-console
    console.log(data);
    dispatch(podcastActions.postPodcast(data));
  };

  return (
    <div>
      <form
        className={styles.createPodcastWrapper}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={styles.content}>
          <div className={styles.contentLeft}>
            <fieldset disabled={isFormDisabled}>
              <p>
                <Input
                  label="Name"
                  name="name"
                  control={control}
                  errors={errors}
                />
              </p>
            </fieldset>
          </div>
          <div>
            <img src={'https://via.placeholder.com/150'} />
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
