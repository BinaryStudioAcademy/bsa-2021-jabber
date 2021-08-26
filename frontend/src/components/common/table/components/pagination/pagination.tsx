import { PageSizes } from './common/constants/constants';
import styles from './styles.module.scss';

type Props = {
  previousPage: () => void;
  canPreviousPage: boolean;
  pageIndex: number;
  gotoPage: (page: number) => void;
  pageCount: number;
  pageSize: number;
  setPageSize: (pageSize: number) => void;
  nextPage: () => void;
  canNextPage: boolean;
};

const Pagination: React.FC<Props> = ({
  previousPage,
  canPreviousPage ,
  pageIndex,
  gotoPage,
  pageCount,
  pageSize,
  setPageSize,
  nextPage,
  canNextPage,
}) => {

  const handlePreviousPage = (): void => {
    previousPage();
  };

  const handleNextPage = (): void => {
    nextPage();
  };

  const changePages = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const page = e.target?.value ? Number(e.target?.value) - 1 : 0;
    gotoPage(page);
  };

  const changePageSizes = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setPageSize(Number(e.target.value));
  };

  return (
    <div className={styles.pagination}>
      <button className={styles.btnPrev} onClick={handlePreviousPage} disabled={!canPreviousPage}>
        PREV
      </button>
      <span>
        {'Page: '}
        <input
          type="number"
          value={pageIndex + 1}
          onChange={changePages}
          className={styles.input}
        />
        <strong>
          {` of ${pageCount} `}
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
