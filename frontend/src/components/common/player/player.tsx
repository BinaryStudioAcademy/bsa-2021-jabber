import H5AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import { FIRST_ARRAY_IDX } from 'common/constants/constants';
import { useState, useEffect, useRef, useCallback } from 'hooks/hooks';
import { getAllowedClasses } from 'helpers/dom/dom';

import {
  ARRAY_SHIFT,
  DEFAULT_SKIP_TIME,
  DEFAULT_START_TIME,
  MILLISECONDS_IN_SECOND,
} from './common/constants';
import { getRatePointerStyle } from './common/helpers';
import { RateStep } from './common/enums';

import { ReactComponent as PlayIcon } from 'assets/img/player/play.svg';
import { ReactComponent as PauseIcon } from 'assets/img/player/pause.svg';
import { ReactComponent as NextIcon } from 'assets/img/player/next.svg';
import { ReactComponent as PreviousIcon } from 'assets/img/player/previous.svg';
import { ReactComponent as RewindIcon } from 'assets/img/player/rewind.svg';
import { ReactComponent as ForwardIcon } from 'assets/img/player/forward.svg';
import { ReactComponent as VolumeIcon } from 'assets/img/player/volume.svg';
import { ReactComponent as MuteIcon } from 'assets/img/player/mute.svg';
import { ReactComponent as RateScaleIcon } from 'assets/img/player/rateScale.svg';
import { ReactComponent as RatePointerIcon } from 'assets/img/player/ratePointer.svg';

import 'react-h5-audio-player/lib/styles.css';
import styles from './styles.module.scss';

type Props = {
  src: string;
  startTime?: number;
  skipTime?: number;
  onClickPrevious?: () => void;
  onClickNext?: () => void;
};

const rateSteps = Object.values(RateStep);

const Player: React.FC<Props> = ({
  src,
  startTime = DEFAULT_START_TIME,
  skipTime = DEFAULT_SKIP_TIME,
  onClickNext,
  onClickPrevious,
}) => {
  const playerRef = useRef<H5AudioPlayer | null>(null);

  const [rateIndex, setRateIndex] = useState(
    rateSteps.indexOf(RateStep.NORMAL),
  );

  useEffect(() => {
    if (playerRef.current && playerRef.current.audio.current) {
      playerRef.current.audio.current.currentTime = startTime;
    }
  }, [startTime]);

  useEffect(() => {
    if (playerRef.current && playerRef.current.audio.current) {
      playerRef.current.audio.current.playbackRate = rateSteps[rateIndex];
    }
  }, [rateIndex]);

  const handleChangeRate = useCallback(() => {
    setRateIndex(
      rateIndex === rateSteps.length - ARRAY_SHIFT
        ? FIRST_ARRAY_IDX
        : rateIndex + ARRAY_SHIFT,
    );
  }, [rateIndex]);

  return (
    <H5AudioPlayer
      ref={playerRef}
      src={src}
      showSkipControls={true}
      progressJumpSteps={{
        backward: skipTime,
        forward: skipTime,
      }}
      onClickNext={onClickNext}
      onClickPrevious={onClickPrevious}
      customAdditionalControls={[]}
      customVolumeControls={[
        RHAP_UI.VOLUME,
        <button
          key={`playback-rate-btn-${Date.now()}`}
          className={styles.playerRateBtn}
          onClick={handleChangeRate}
        >
          <RateScaleIcon />
          <RatePointerIcon style={getRatePointerStyle(rateIndex)} />
          <span>{rateSteps[rateIndex]}</span>
        </button>,
      ]}
      customIcons={{
        next: (
          <NextIcon
            className={getAllowedClasses(
              styles.playerCommonBtn,
              styles.playerNextBtn,
            )}
          />
        ),
        previous: (
          <PreviousIcon
            className={getAllowedClasses(
              styles.playerCommonBtn,
              styles.playerPreviousBtn,
            )}
          />
        ),
        volume: (
          <VolumeIcon
            className={getAllowedClasses(
              styles.playerCommonBtn,
              styles.playerVolumeBtn,
            )}
          />
        ),
        volumeMute: (
          <MuteIcon
            className={getAllowedClasses(
              styles.playerCommonBtn,
              styles.playerVolumeBtn,
            )}
          />
        ),
        play: (
          <div
            className={getAllowedClasses(
              styles.playerCommonBtn,
              styles.playerMainBtn,
              styles.playerPlayBtn,
            )}
          >
            <PlayIcon />
          </div>
        ),
        pause: (
          <div
            className={getAllowedClasses(
              styles.playerCommonBtn,
              styles.playerMainBtn,
            )}
          >
            <PauseIcon />
          </div>
        ),
        rewind: (
          <div
            className={getAllowedClasses(
              styles.playerCommonBtn,
              styles.playerRewindBtn,
            )}
          >
            <span className={styles.playerRewindSeconds}>
              {skipTime / MILLISECONDS_IN_SECOND}
            </span>
            <RewindIcon />
          </div>
        ),
        forward: (
          <div
            className={getAllowedClasses(
              styles.playerCommonBtn,
              styles.playerRewindBtn,
            )}
          >
            <span className={styles.playerRewindSeconds}>
              {skipTime / MILLISECONDS_IN_SECOND}
            </span>
            <ForwardIcon />
          </div>
        ),
      }}
    />
  );
};

export default Player;
