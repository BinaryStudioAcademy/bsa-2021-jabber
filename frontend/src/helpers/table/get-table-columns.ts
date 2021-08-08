import { Column } from 'react-table';

const getTableColumns = (columnsScheme: Record<string, string>[]): Column[] => {
  const columns: Column[] = [
    {
      Header: '#',
      accessor: (_originalRow, rowIndex): string => String(rowIndex),
    },
  ];

  columnsScheme.forEach((column) => {
    columns.push({
      Header: column.Header,
      accessor: column.accessor,
    });
  });
  return columns;
};

export { getTableColumns };
