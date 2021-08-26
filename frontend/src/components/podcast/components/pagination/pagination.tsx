import { PageSizes } from './common/constants/constants';
import styles from './styles.module.scss';

type Props = {
  setPageSize: (size: number) => void;
  setPage: (page: number) => void;
  pageIndex: number;
  pageSize: number;
};

const Pagination: React.FC<Props> = ({
  pageSize,
  setPageSize,
  setPage,
  pageIndex,
}) => {

  const handlePreviousPage = (): void => {
    setPage(pageIndex - 1);
  };

  const handleNextPage = (): void => {
    setPage(pageIndex + 1);
  };

  const changePages = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const page = e.target?.value ? Number(e.target?.value) : pageIndex;
    setPage(page);
  };

  const changePageSizes = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setPageSize(Number(e.target.value));
  };

  const canPreviousPage = pageIndex !== 1;
  const canNextPage = pageIndex !== 2;

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
          {` of ${2} `}
        </strong>
      </span>
      <select
        value={pageSize}
        onChange={changePageSizes}
        className={styles.input}
      >
        {PageSizes.map((pageSize): JSX.Element => (
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
