import { useTable } from 'hooks/hooks';
import { Column, useSortBy } from 'react-table';
import styles from './styles.module.scss';
import { getAllowedClasses } from 'helpers/helpers';
import { Pagination } from './components/components';

type Props = {
  columns: Column[];
  data: unknown[];
  handleSetRow: (row: number) => void;
  handleSetPage: (page: number) => void;
  pageIndex: number;
  pageSize: number;
  totalCountEpisodes: number;
};

const Table: React.FC<Props> = ({
  columns,
  data = [],
  pageSize,
  handleSetRow,
  handleSetPage,
  pageIndex,
  totalCountEpisodes,
}) => {
  const tableInstance = useTable({
    columns: columns as Column<Record<string, string>>[],
    data: data as Record<string, string>[],
  }, useSortBy);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  return (
    <div className={styles.tableWrapper}>
      <table {...getTableProps()} className={styles.table}>
        <thead>
          {headerGroups.map((headerGroup, i) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={i}>
              {headerGroup.headers.map((column, i) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())} key={i}>
                  <span>{column.render('Header')}</span>
                  <span className={getAllowedClasses([styles.sortIndicator, column.isSorted
                    ? column.isSortedDesc
                      ? styles.desc
                      : styles.asc
                    : null])
                  }>
                  </span>
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
      <Pagination
        handleSetRow={handleSetRow}
        handleSetPage={handleSetPage}
        pageIndex={pageIndex}
        pageSize={pageSize}
        totalCountEpisodes={totalCountEpisodes}
      />
    </div>
  );
};

export default Table;
