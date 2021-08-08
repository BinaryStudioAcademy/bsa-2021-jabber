import { Column } from 'react-table';

const getColumns = (columnsScheme: Record<string, string>): Column[] => {
  const columns: Column[] = [
    {
      Header: '#',
      accessor: (_originalRow, rowIndex): string => String(rowIndex),
    },
  ];

  Object.keys(columnsScheme).forEach((key) => {
    columns.push({
      Header: columnsScheme[key],
      accessor: key,
    });
  });

  return columns;
};

export { getColumns };
