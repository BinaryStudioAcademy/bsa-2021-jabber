import { PAGE_SIZE, PAGINATION_START_VALUE, PAGINATION_STEP } from './common/constants/constants';
import styles from './styles.module.scss';

type Props = {
  onSetRow: (row: number) => void;
  onSetPage: (page: number) => void;
  pageIndex: number;
  pageSize: number;
  totalCountItems: number;
};

const Pagination: React.FC<Props> = ({
  pageSize,
  onSetRow,
  onSetPage,
  pageIndex,
  totalCountItems,
}) => {

  const countPage = Math.ceil(totalCountItems / pageSize);

  const handlePreviousPage = (): void => {
    onSetRow(pageIndex - PAGINATION_STEP);
  };

  const handleNextPage = (): void => {
    onSetPage(pageIndex + PAGINATION_STEP);
  };

  const handlePagesChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    const newPage = Number(evt.target.value);

    if(!newPage || newPage === pageIndex || newPage > countPage || newPage < PAGINATION_START_VALUE){
      return;
    }

    onSetPage(newPage);
  };

  const handlePageSizesChange = (evt: React.ChangeEvent<HTMLSelectElement>): void => {
    onSetRow(Number(evt.target.value));
  };

  const canPreviousPage = pageIndex !== PAGINATION_START_VALUE;
  const canNextPage = pageIndex !== countPage;

  return (
    <div className={styles.pagination}>
      <button className={styles.btnPrev} onClick={handlePreviousPage} disabled={!canPreviousPage}>
        prev
      </button>
      <span>
        Page:
        <input
          type="number"
          value={pageIndex}
          onChange={handlePagesChange}
          className={styles.input}
        />
        <strong>
          {` of ${countPage} `}
        </strong>
      </span>
      <select
        value={pageSize}
        onChange={handlePageSizesChange}
        className={styles.input}
      >
        {PAGE_SIZE.map((pageSize): JSX.Element => (
          <option key={pageSize} value={pageSize}>
            Row {pageSize}
          </option>
        ))}
      </select>
      <button className={styles.btnNext} onClick={handleNextPage} disabled={!canNextPage}>
        next
      </button>
    </div>
  );
};

export default Pagination;
