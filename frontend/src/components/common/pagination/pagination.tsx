import { getAllowedClasses } from 'helpers/helpers';
import ReactPaginate from 'react-paginate';
import { MARGIN_PAGES_DISPLAYED, PAGE_RANGE_DISPLAYED } from './common/constants/constants';
import { getShowingRows } from './helpers/helpers';
import styles from './styles.module.scss';

type Props = {
  pageCount: number;
  currentPage: number;
  onPageChange: (selected: number) => void;
  className?: string;
  totalRowsCount?: number
  defaultPaginationRows?: number
};

const Pagination: React.FC<Props> = ({
  pageCount,
  currentPage,
  onPageChange,
  className,
  totalRowsCount,
  defaultPaginationRows,
}) => {
  const showingRows = getShowingRows(currentPage, totalRowsCount, defaultPaginationRows);

  const handlePageChange = ({ selected }: { selected: number }): void => {
    onPageChange(selected);
  };

  return pageCount ? (
    <div className={getAllowedClasses(className)}>
      {totalRowsCount && <div className={styles.showRowsWrapper}>
        Showing <span className={styles.currentShowingRow}>{showingRows}</span>/{totalRowsCount} row
      </div>}
      <ReactPaginate
        previousLabel={''}
        nextLabel={''}
        breakLabel={'...'}
        pageCount={pageCount}
        forcePage={currentPage}
        marginPagesDisplayed={MARGIN_PAGES_DISPLAYED}
        pageRangeDisplayed={PAGE_RANGE_DISPLAYED}
        onPageChange={handlePageChange}
        containerClassName={styles.pagination}
        previousClassName={styles.previous}
        nextClassName={styles.next}
        pageClassName={styles.page}
        pageLinkClassName={styles.link}
        activeLinkClassName={styles.linkActive}
        breakClassName={styles.break}
        activeClassName={'active'}
      />
    </div>
  ) : null;
};

export default Pagination;
