import { useMemo, useTable } from 'hooks/hooks';
import { Column } from 'react-table';

import { ITableData } from 'common/types/types';
import styles from './styles.module.scss';

type Props = {
  columns: Column[];
  data?: ITableData[];
};

const Table: React.FC<Props> = ({ columns, data = [] }) => {
  const dataMemoized: ITableData[] = useMemo(() => data, [data]);
  const columnsTyped = columns as unknown as Column<ITableData>[];
  const columnsMemoized = useMemo(() => columnsTyped, [columnsTyped]);

  const tableInstance = useTable({
    columns: columnsMemoized,
    data: dataMemoized,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return dataMemoized.length ? (
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

export default Table;
