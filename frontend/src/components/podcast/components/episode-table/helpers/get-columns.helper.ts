import { Column } from 'react-table';

const getColumns = (): Column[] => {
  const columns: Column[] = [
    {
      Header: '#',
      accessor: (_originalRow, rowIndex): string => String(rowIndex + 1),
    },
    {
      Header: 'Name and Host',
      accessor: 'name',
    },
    {
      Header: 'Created At',
      accessor: 'createdAt',
    },
  ];

  return columns;
};

export { getColumns };
