import { INCREASE_CONT_FOR_IDX } from 'common/constants/constants';

const getNumberingRows = (rowIndex: number, rowsCount: number, currentPage: number): number => {
  return currentPage
    ? rowIndex + INCREASE_CONT_FOR_IDX + rowsCount * currentPage
    : rowIndex + INCREASE_CONT_FOR_IDX;
};

export { getNumberingRows };
