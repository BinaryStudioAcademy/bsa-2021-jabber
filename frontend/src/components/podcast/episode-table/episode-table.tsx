import { useMemo, useTable } from 'hooks/hooks';
import { Column } from 'react-table';

import { EpisodeItem } from '../common/types/types';
import styles from './styles.module.scss';

type Props = {
  episodes?: EpisodeItem[];
};

type EpisodeDescription = {
  episodeName: string;
  authorName: string;
};

const EpisodeTable: React.FC<Props> = ({ episodes = [] }) => {
  const data: EpisodeItem[] = useMemo(() => episodes, [episodes]);

  const columns: Column<EpisodeItem>[] = useMemo(
    () => [
      {
        Header: '#',
        accessor: (_originalRow, rowIndex): string => String(rowIndex),
      },
      {
        Header: 'Name and Host',
        accessor: (row: EpisodeItem): EpisodeDescription => {
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
    ],
    [],
  );

  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return data.length ? (
    <table {...getTableProps()} className={styles.table}>
      <thead>
        {headerGroups.map((headerGroup, i) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={i}>
            {headerGroup.headers.map((column, i) => (
              <th {...column.getHeaderProps()} key={i}>
                <span>{column.render('Header')}</span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={i} className={styles.episodeRow}>
              {row.cells.map((cell, i) => {
                return (
                  <td {...cell.getCellProps()} key={i}>
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  ) : (
    <h1 className={styles.notFound}>Oops. There is no any episode</h1>
  );
};

export default EpisodeTable;
