import { PodcastCreatePayload } from 'common/types/types';
import { DataStatus } from 'common/enums/enums';
import { podcast as podcastActions } from 'store/actions';
import { useAppSelector, useDispatch, useState } from 'hooks/hooks';
import { Input, Button } from 'components/common/common';
import styles from './styles.module.scss';

const CreatePodcast: React.FC = () => {
  const [podcastCreatePayload, setPodcastCreatePayload] =
    useState<PodcastCreatePayload>({
      name: '',
      userId: 7,
    });

  const { createPodcastStatus } = useAppSelector(({ podcast }) => ({
    createPodcastStatus: podcast.dataStatus,
  }));
  const dispatch = useDispatch();

  const isFormDisable = createPodcastStatus === DataStatus.PENDING;

  const handlePostPodcast = (): void => {
    dispatch(podcastActions.postPodcast(podcastCreatePayload));
  };

  const handleChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => {
    setPodcastCreatePayload({
      ...podcastCreatePayload,
      [target.name]: target.value,
    });
  };

  return (
    <div>
      <div className={styles.createPodcastWrapper}>
        <div className={styles.content}>
          <div className={styles.contentLeft}>
            <p>
              <Input
                label="Name"
                value={podcastCreatePayload.name}
                name="name"
                isDisabled={isFormDisable}
                onChange={handleChange}
              />
            </p>
            <p>
              <Input
                label="Description"
                value={''}
                name="description"
                isDisabled={isFormDisable}
                onChange={handleChange}
              />
            </p>
            <p>
              <Input
                label="Genre"
                value={''}
                name="genre"
                isDisabled={isFormDisable}
                onChange={handleChange}
              />
            </p>
          </div>
          <div>
            <img src={'https://via.placeholder.com/150'} />
          </div>
        </div>
        <p>
          <Button label="Save" onClick={handlePostPodcast} />
        </p>
      </div>
    </div>
  );
};

export default CreatePodcast;
