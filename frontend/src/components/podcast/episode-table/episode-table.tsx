import { useMemo, useTable } from 'hooks/hooks';
import { Column } from 'react-table';
import styles from './styles.module.scss';

const EpisodeTable: React.FC = () => {
  const data: Array<any> = useMemo(
    () => [
      {
        index: '1',
        full_name: 'Tesla',
        user_name: 'John Dou',
        genre: 'Technologies',
        order: 'Episode 1',
        time: '50:12',
      },
      {
        index: '2',
        full_name: 'New car',
        user_name: 'John Dou',
        genre: 'Technologies',
        order: 'Episode 2',
        time: '34:23',
      },
      {
        index: '1',
        full_name: 'Tesla',
        user_name: 'John Dou',
        genre: 'Technologies',
        order: 'Episode 1',
        time: '50:12',
      },
      {
        index: '2',
        full_name: 'New car',
        user_name: 'John Dou',
        genre: 'Technologies',
        order: 'Episode 2',
        time: '34:23',
      },
    ],
    [],
  );

  const columns: Array<Column> = useMemo(
    () => [
      {
        Header: '#',
        accessor: 'index', // accessor is the "key" in the data
      },
      {
        Header: 'Name and Host',
        accessor: (row: any): any => {
          return row.user_name + row.full_name + row.time;
        },
        Cell: ({ value }): string => {
          return value;
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

  return (
    // apply the table props
    <table {...getTableProps()} className={styles.table}>
      <thead>
        {
          // Loop over the header rows
          headerGroups.map((headerGroup, i) => (
            // Apply the header row props
            <tr {...headerGroup.getHeaderGroupProps()} key={i}>
              {
                // Loop over the headers in each row
                headerGroup.headers.map((column, i) => (
                  // Apply the header cell props
                  <th {...column.getHeaderProps()} key={i}>
                    <span>
                      {
                        // Render the header
                        column.render('Header')
                      }
                    </span>
                  </th>
                ))
              }
            </tr>
          ))
        }
      </thead>
      {/* Apply the table body props */}
      <tbody {...getTableBodyProps()}>
        {
          // Loop over the table rows
          rows.map((row, i) => {
            // Prepare the row for display
            prepareRow(row);
            return (
              // Apply the row props
              <tr {...row.getRowProps()} key={i}>
                {
                  // Loop over the rows cells
                  row.cells.map((cell, i) => {
                    // Apply the cell props
                    return (
                      <td {...cell.getCellProps()} key={i}>
                        {
                          // Render the cell contents
                          cell.render('Cell')
                        }
                      </td>
                    );
                  })
                }
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
};

export default EpisodeTable;
