import { PAGE_SIZE } from './common/constants/constants';
import styles from './styles.module.scss';

type Props = {
  setRow: (row: number) => void;
  setPage: (page: number) => void;
  pageIndex: number;
  pageSize: number;
  totalCountEpisodes: number;
};

const Pagination: React.FC<Props> = ({
  pageSize,
  setRow,
  setPage,
  pageIndex,
  totalCountEpisodes,
}) => {

  const countPage = Math.ceil(totalCountEpisodes / pageSize);

  const handlePreviousPage = (): void => {
    setPage(pageIndex - 1);
  };

  const handleNextPage = (): void => {
    setPage(pageIndex + 1);
  };

  const changePages = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newPage = Number(e.target.value);

    if(!newPage || newPage === pageIndex || newPage > countPage || newPage < 1){
      return;
    }

    setPage(newPage);
  };

  const changePageSizes = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setRow(Number(e.target.value));
  };

  const canPreviousPage = pageIndex !== 1;
  const canNextPage = pageIndex !== countPage;

  return (
    <div className={styles.pagination}>
      <button className={styles.btnPrev} onClick={handlePreviousPage} disabled={!canPreviousPage}>
        PREV
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
        NEXT
      </button>
    </div>
  );
};

export default Pagination;
