import { INCREASE_CONT_FOR_IDX } from 'common/constants/constants';
import { MIN_SHOWING_ROWS } from '../../common/constants/constants';

const getShowingRows = (
  currentPage: number,
  totalRowsCount: number | undefined,
  defaultPaginationRows: number | undefined,
): number => {
  const realCurrentPage = currentPage + INCREASE_CONT_FOR_IDX;

  if (totalRowsCount && defaultPaginationRows) {
    return Math.min(totalRowsCount, defaultPaginationRows * realCurrentPage);
  }

  return MIN_SHOWING_ROWS;
};

export { getShowingRows };
