import { forwardRef } from 'react';
import H5AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useImperativeHandle,
} from 'hooks/hooks';
import 'react-h5-audio-player/lib/styles.css';
import styles from './styles.module.scss';
import { getAllowedClasses } from 'helpers/dom/dom';
import { getRatePointerStyle } from './common/helpers';
import { MILLISECONDS_IN_SECOND, RATE_STEPS } from './common/constants';

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

type Props = {
  src: string;
  skipTime?: number;
  onClickPrevious?: () => void;
  onClickNext?: () => void;
};

type Ref = {
  setCurrentTime: (seconds: number) => void;
};

const Player = forwardRef<Ref, Props>(
  ({ src, skipTime = 15000, onClickNext, onClickPrevious }, ref) => {
    const playerRef = useRef<H5AudioPlayer | null>(null);
    const [rateIndex, setRateIndex] = useState(3);

    useImperativeHandle(ref, () => ({
      setCurrentTime: (seconds: number): void => {
        if (playerRef.current && playerRef.current.audio.current) {
          playerRef.current.audio.current.currentTime = seconds;
        }
      },
    }));

    useEffect(() => {
      if (playerRef.current && playerRef.current.audio.current) {
        playerRef.current.audio.current.playbackRate = Number(
          RATE_STEPS[rateIndex],
        );
      }
    }, [rateIndex]);

    const handleChangeRate = useCallback(() => {
      if (rateIndex === RATE_STEPS.length - 1) {
        setRateIndex(0);
      } else {
        setRateIndex(rateIndex + 1);
      }
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
            key={Date.now()}
            className={styles.playerRateBtn}
            onClick={handleChangeRate}
          >
            <RateScaleIcon />
            <RatePointerIcon style={getRatePointerStyle(rateIndex)} />
            <span>{RATE_STEPS[rateIndex]}</span>
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
  },
);

Player.displayName = 'Player';

export default Player;
export type { Ref as PlayerRef };
