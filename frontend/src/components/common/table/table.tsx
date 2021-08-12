import { AppRoute } from 'common/enums/enums';
import { useTable } from 'hooks/hooks';
import { Column } from 'react-table';
import { Link } from 'components/common/common';
import styles from './styles.module.scss';

type Props = {
  columns: Column[];
  data: unknown[];
};

const Table: React.FC<Props> = ({ columns, data = [] }) => {
  const tableInstance = useTable({
    columns: columns as Column<Record<string, string>>[],
    data: data as Record<string, string>[],
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
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
          const episodeId = row.original.episodeId;
          return (            
            <tr {...row.getRowProps()} key={i} className={styles.episodeRow}>
              {row.cells.map((cell, i) => {
                return ( i === 1 
                  ? <td {...cell.getCellProps()} key={i}>
                    <Link to={`${AppRoute.EPISODES}/${episodeId}`} key={i} className={styles.link}>
                      {cell.render('Cell')}
                    </Link>
                  </td>                  
                  : <td {...cell.getCellProps()} key={i}>
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
