import { PAGE_SIZE, PAGINATION_START_VALUE, PAGINATION_STEP } from './common/constants/constants';
import styles from './styles.module.scss';

type Props = {
  handleSetRow: (row: number) => void;
  handleSetPage: (page: number) => void;
  pageIndex: number;
  pageSize: number;
  totalCountEpisodes: number;
};

const Pagination: React.FC<Props> = ({
  pageSize,
  handleSetRow,
  handleSetPage,
  pageIndex,
  totalCountEpisodes,
}) => {

  const countPage = Math.ceil(totalCountEpisodes / pageSize);

  const handlePreviousPage = (): void => {
    handleSetPage(pageIndex - PAGINATION_STEP);
  };

  const handleNextPage = (): void => {
    handleSetPage(pageIndex + PAGINATION_STEP);
  };

  const changePages = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    const newPage = Number(evt.target.value);

    if(!newPage || newPage === pageIndex || newPage > countPage || newPage < PAGINATION_START_VALUE){
      return;
    }

    handleSetPage(newPage);
  };

  const changePageSizes = (evt: React.ChangeEvent<HTMLSelectElement>): void => {
    handleSetRow(Number(evt.target.value));
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
          onChange={changePages}
          className={styles.input}
        />
        <strong>
          {` of ${countPage} `}
        </strong>
      </span>
      <select
        value={pageSize}
        onChange={changePageSizes}
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
