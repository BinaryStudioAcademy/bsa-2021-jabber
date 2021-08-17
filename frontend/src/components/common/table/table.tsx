import { useTable } from 'hooks/hooks';
import { Column, useSortBy } from 'react-table';
import styles from './styles.module.scss';

type Props = {
  columns: Column[];
  data: unknown[];
};

const Table: React.FC<Props> = ({ columns, data = [] }) => {
  const tableInstance = useTable({
    columns: columns as Column<Record<string, string>>[],
    data: data as Record<string, string>[],
  }, useSortBy);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <table {...getTableProps()} className={styles.table}>
      <thead>
        {headerGroups.map((headerGroup, i) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={i}>
            {headerGroup.headers.map((column, i) => (

              <th {...column.getHeaderProps(column.getSortByToggleProps())} key={i}>
                <span>{column.render('Header')}</span>
                <span className={`${styles.sortIndicator} ${column.isSorted
                  ? column.isSortedDesc
                    ? styles.desc
                    : styles.asc
                  : ''}`
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
  );
};

export default Table;
