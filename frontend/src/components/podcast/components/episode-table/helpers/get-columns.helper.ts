import { Column } from 'react-table';

const getColumns = (): Column[] => {
  const columns: Column[] = [
    {
      Header: '#',
      accessor: (_originalRow, rowIndex): string => String(rowIndex),
    },
    {
      Header: 'Name and Host',
      accessor: 'name',
    },
    {
      Header: 'Episode',
      accessor: 'description',
    },
  ];

  return columns;
};

export { getColumns };
