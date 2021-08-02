import { forwardRef } from 'react';
import H5AudioPlayer from 'react-h5-audio-player';
import { useRef, useImperativeHandle } from 'hooks/hooks';
import 'react-h5-audio-player/lib/styles.css';
import styles from './styles.module.scss';
import { getAllowedClasses } from 'helpers/dom/dom';

import { ReactComponent as PlayIcon } from '../../../assets/img/player/play.svg';
import { ReactComponent as PauseIcon } from '../../../assets/img/player/pause.svg';
import { ReactComponent as NextIcon } from '../../../assets/img/player/next.svg';
import { ReactComponent as PreviousIcon } from '../../../assets/img/player/previous.svg';
import { ReactComponent as RewindIcon } from '../../../assets/img/player/rewind.svg';
import { ReactComponent as ForwardIcon } from '../../../assets/img/player/forward.svg';
import { ReactComponent as VolumeIcon } from '../../../assets/img/player/volume.svg';
import { ReactComponent as MuteIcon } from '../../../assets/img/player/mute.svg';

type Props = {
  src: string;
  skipTime?: number;
  onClickPrevious?: () => void;
  onClickNext?: () => void;
};

type Ref = {
  setCurrentTime: (seconds: number) => void;
};

const MILLISECONDS_IN_SECOND = 1000;

const Player = forwardRef<Ref, Props>(
  ({ src, skipTime = 15000, onClickNext, onClickPrevious }, ref) => {
    const playerRef = useRef<H5AudioPlayer>(null);

    useImperativeHandle(ref, () => ({
      setCurrentTime: (seconds: number): void => {
        if (playerRef.current && playerRef.current.audio.current) {
          playerRef.current.audio.current.currentTime = seconds;
        }
      },
    }));

    return (
      <H5AudioPlayer
        ref={playerRef}
        src={src}
        showSkipControls={true}
        progressJumpSteps={{
          backward: skipTime,
          forward: skipTime,
        }}
        customAdditionalControls={[]}
        onClickNext={onClickNext}
        onClickPrevious={onClickPrevious}
        customIcons={{
          play: (
            <div
              className={getAllowedClasses([
                styles.playerCommonBtn,
                styles.playerMainBtn,
                styles.playerPlayBtn,
              ])}
            >
              <PlayIcon />
            </div>
          ),
          pause: (
            <div
              className={getAllowedClasses([
                styles.playerCommonBtn,
                styles.playerMainBtn,
              ])}
            >
              <PauseIcon />
            </div>
          ),
          next: (
            <div
              className={getAllowedClasses([
                styles.playerCommonBtn,
                styles.playerNextBtn,
              ])}
            >
              <NextIcon />
            </div>
          ),
          previous: (
            <div
              className={getAllowedClasses([
                styles.playerCommonBtn,
                styles.playerPreviousBtn,
              ])}
            >
              <PreviousIcon />
            </div>
          ),
          rewind: (
            <div
              className={getAllowedClasses([
                styles.playerCommonBtn,
                styles.playerRewindBtn,
              ])}
            >
              <span className={styles.playerRewindSeconds}>
                {skipTime / MILLISECONDS_IN_SECOND}
              </span>
              <RewindIcon />
            </div>
          ),
          forward: (
            <div
              className={getAllowedClasses([
                styles.playerCommonBtn,
                styles.playerRewindBtn,
              ])}
            >
              <span className={styles.playerRewindSeconds}>
                {skipTime / MILLISECONDS_IN_SECOND}
              </span>
              <ForwardIcon />
            </div>
          ),
          volume: (
            <div
              className={getAllowedClasses([
                styles.playerCommonBtn,
                styles.playerVolumeBtn,
              ])}
            >
              <VolumeIcon />
            </div>
          ),
          volumeMute: (
            <div
              className={getAllowedClasses([
                styles.playerCommonBtn,
                styles.playerVolumeBtn,
              ])}
            >
              <MuteIcon />
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
