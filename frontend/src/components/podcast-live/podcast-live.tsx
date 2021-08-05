import { useAppSelector, useDispatch, useEffect } from 'hooks/hooks';
import { record as recordActions } from 'store/actions';
import { RecordStatus, ButtonColor } from 'common/enums/enums';
import Button from 'components/common/button/button';
import styles from './styles.module.scss';

const PodcastLive: React.FC = () => {
  const dispatch = useDispatch();
  const { recordStatus } = useAppSelector(({ record }) => ({
    recordStatus: record.recordStatus,
  }));
  const isPaused = recordStatus === RecordStatus.PAUSED;

  useEffect(() => {
    dispatch(recordActions.initRecord());
  }, []);

  const handleRecord = (): void => {
    dispatch(recordActions.startRecord());
  };

  const handlePause = (): void => {
    dispatch(recordActions.pauseRecord());
  };

  const handleResume = (): void => {
    dispatch(recordActions.resumeRecord());
  };

  const handleStop = (): void => {
    dispatch(recordActions.stopRecord());
  };

  return (
    <main className={styles.root}>
      <h1>Record podcast</h1>
      <h3>
        Status:
        {' '}
        {recordStatus}
      </h3>
      <div className={styles.buttonRow}>
        <Button
          label="&#9210;"
          buttonColor={ButtonColor.LIGHT_NAVY}
          onClick={handleRecord} />
        {!isPaused
          ? <Button
            label="&#9208;"
            buttonColor={ButtonColor.LIGHT_NAVY}
            onClick={handlePause} />
          : <Button
            label="&#9654;"
            buttonColor={ButtonColor.LIGHT_NAVY}
            onClick={handleResume} />}

        <Button
          label="&#9209;"
          buttonColor={ButtonColor.LIGHT_NAVY}
          onClick={handleStop} />
      </div>
    </main>
  );
};

export default PodcastLive;
