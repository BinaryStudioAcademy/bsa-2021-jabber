import { useAppSelector, useDispatch, useEffect, useParams } from 'hooks/hooks';
import { podcast as podcastActions } from 'store/actions';
import EpisodeTable from './episode-table/episode-table';
import { PageParams, ITableData } from './common/types/types';
import styles from './styles.module.scss';

import { Column } from 'react-table';

type EpisodeDescription = {
  episodeName: string;
  authorName: string;
};

const columns: Column[] = [
  {
    Header: '#',
    accessor: (_originalRow, rowIndex): string => String(rowIndex),
  },
  {
    Header: 'Name and Host',
    accessor: (row: any): EpisodeDescription => {
      return {
        episodeName: row.episodeName,
        authorName: `${row.userFirstName} ${row.userLastName}`,
      };
    },
    Cell: function myFunc({
      value,
    }: {
      value: EpisodeDescription;
    }): JSX.Element {
      return (
        <>
          <div className={styles.episodeName}>{value.episodeName}</div>
          <div className={styles.authorName}>{value.authorName}</div>
        </>
      );
    },
  },
  {
    Header: 'Genre',
    accessor: 'genre',
  },
  {
    Header: 'Episode',
    accessor: 'order',
  },
  {
    Header: 'Time',
    accessor: 'time',
  },
];

const Podcast: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<PageParams>();

  const { podcast } = useAppSelector(({ podcast }) => ({
    podcast: podcast.podcast,
  }));

  useEffect(() => {
    dispatch(podcastActions.loadPodcast(Number(id)));
  }, []);

  const episodes: ITableData[] = [
    {
      episodeName: 'Tesla',
      userFirstName: 'John',
      userLastName: ' Dou',
      genre: 'Technologies',
      order: 'Episode 1',
      time: '50:12',
    },
    {
      episodeName: 'New car',
      userFirstName: 'John',
      userLastName: ' Dou',
      genre: 'Technologies',
      order: 'Episode 2',
      time: '34:23',
    },
    {
      episodeName: 'Tesla',
      userFirstName: 'John',
      userLastName: ' Dou',
      genre: 'Technologies',
      order: 'Episode 1',
      time: '50:12',
    },
    {
      episodeName: 'New car',
      userFirstName: 'John',
      userLastName: ' Dou',
      genre: 'Technologies',
      order: 'Episode 2',
      time: '34:23',
    },
  ];

  return (
    <main className={styles.podcast}>
      {podcast ? (
        <>
          <div className={styles.content}>
            <div className={styles.descriptionWrapper}>
              <h1 className={styles.title}>{podcast.name}</h1>
              <p className={styles.description}>{podcast.description}</p>
            </div>
            <p className={styles.logoWrapper}>
              <img
                src="#"
                width="280"
                height="280"
                loading="lazy"
                alt={podcast.name}
              />
            </p>
          </div>
          <EpisodeTable columns={columns} data={episodes} />
        </>
      ) : (
        <h1 className={styles.notFound}>Oops. There is no such podcast</h1>
      )}
    </main>
  );
};

export default Podcast;
