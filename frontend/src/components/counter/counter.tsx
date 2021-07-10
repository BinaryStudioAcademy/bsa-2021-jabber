import { useSelector, useDispatch, useState } from 'hooks/hooks';
import { getAllowedClasses } from 'helpers/dom/dom';
import { RootState } from 'common/types/types';
import { counter as counterActions } from 'store/actions';
import styles from './styles.module.scss';

const Counter: React.FC = () => {
  const { count } = useSelector(({ counter }: RootState) => ({
    count: counter.value,
  }));
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState<string>('2');

  const handleIncrementChange = (
    evt: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setIncrementAmount(evt.target.value);
  };

  const handleIncrement = (): void => {
    dispatch(counterActions.increment());
  };

  const handleDecrement = (): void => {
    dispatch(counterActions.decrement());
  };

  const handleIncrementByAmount = (): void => {
    dispatch(counterActions.incrementByAmount(Number(incrementAmount) ?? 0));
  };

  const handleIncrementAsync = (): void => {
    dispatch(counterActions.incrementAsync(Number(incrementAmount) ?? 0));
  };

  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={handleIncrement}
        >
          +
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={handleDecrement}
        >
          -
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={handleIncrementChange}
        />
        <button className={styles.button} onClick={handleIncrementByAmount}>
          Add Amount
        </button>
        <button
          className={getAllowedClasses(styles.asyncButton, styles.button)}
          onClick={handleIncrementAsync}
        >
          Add Async
        </button>
      </div>
    </div>
  );
};

export default Counter;
