import { useTable } from 'hooks/hooks';
import { Column, useSortBy, usePagination } from 'react-table';
import styles from './styles.module.scss';
import { getAllowedClasses } from 'helpers/helpers';
import { Pagination } from './components/components';

type Props = {
  columns: Column[];
  data: unknown[];
};

const Table: React.FC<Props> = ({ columns, data = [] }) => {
  const tableInstance = useTable(
    {
      columns: columns as Column<Record<string, string>>[],
      data: data as Record<string, string>[],
    },
    useSortBy,
    usePagination,
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    pageOptions,
    state: { pageIndex, pageSize },
    setPageSize,
    gotoPage,
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
  } = tableInstance;

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
          {page.map((row, i) => {
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
        previousPage={previousPage}
        canPreviousPage={canPreviousPage}
        pageIndex={pageIndex}
        gotoPage={gotoPage}
        pageCount={pageOptions.length}
        pageSize={pageSize}
        setPageSize={setPageSize}
        nextPage={nextPage}
        canNextPage={canNextPage}
      />
    </div>
  );
};

export default Table;
