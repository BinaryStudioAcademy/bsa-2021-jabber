import { useState } from 'hooks/hooks';
import { Input, Button } from 'components/common/common';
import styles from './styles.module.scss';

const CreatePodcast: React.FC = () => {
  const [podcastPayload, setPodcastPayload] = useState({
    name: '',
    description: '',
    genre: '',
  });

  const handleChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => {
    setPodcastPayload({
      ...podcastPayload,
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
                name="name"
                value={podcastPayload.name}
                onChange={handleChange}
              />
            </p>
            <p>
              <Input
                label="Description"
                name="description"
                value={podcastPayload.description}
                onChange={handleChange}
              />
            </p>
            <p>
              <Input
                label="Genre"
                name="genre"
                value={podcastPayload.genre}
                onChange={handleChange}
              />
            </p>
          </div>
          <div>
            <img src={'https://via.placeholder.com/150'} />
          </div>
        </div>
        <p>
          <Button label="Save" />
        </p>
      </div>
    </div>
  );
};

export default CreatePodcast;
