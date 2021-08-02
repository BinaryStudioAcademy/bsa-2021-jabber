import { forwardRef } from 'react';
import H5AudioPlayer from 'react-h5-audio-player';
import { useRef, useImperativeHandle } from 'hooks/hooks';
import 'react-h5-audio-player/lib/styles.css';
import styles from './styles.module.scss';
import { getAllowedClasses } from 'helpers/dom/dom';

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
              <svg viewBox="0 0 14 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.5383 9.38518L1.23076 0.154505C0.999989 -0.0208782 0.686147 -0.0485703 0.426149 0.0821977C0.164614 0.212966 0 0.479117 0 0.769883L0 19.2312C0 19.522 0.164614 19.7882 0.424611 19.9189C0.533841 19.9728 0.652301 20.0005 0.769223 20.0005C0.932298 20.0005 1.09537 19.9482 1.23076 19.8466L13.5383 10.6159C13.7322 10.4713 13.846 10.2421 13.846 10.0006C13.846 9.75903 13.7322 9.5298 13.5383 9.38518Z" />
              </svg>
            </div>
          ),
          pause: (
            <div
              className={getAllowedClasses([
                styles.playerCommonBtn,
                styles.playerMainBtn,
              ])}
            >
              <svg viewBox="0 0 18 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.08339 0H1.91675C1.22757 0 0.666748 0.56082 0.666748 1.25V18.75C0.666748 19.4392 1.22757 20 1.91675 20H6.08343C6.77261 20 7.33343 19.4392 7.33343 18.75V1.25C7.33339 0.56082 6.77257 0 6.08339 0Z" />
                <path d="M16.0834 0H11.9167C11.2276 0 10.6667 0.56082 10.6667 1.25V18.75C10.6667 19.4392 11.2276 20 11.9167 20H16.0834C16.7726 20 17.3334 19.4392 17.3334 18.75V1.25C17.3334 0.56082 16.7726 0 16.0834 0Z" />
              </svg>
            </div>
          ),
          next: (
            <svg
              viewBox="0 0 20 20"
              className={getAllowedClasses([
                styles.playerCommonBtn,
                styles.playerNextBtn,
              ])}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M13.5383 9.38518L1.23076 0.154505C0.999989 -0.0208782 0.686147 -0.0485703 0.426149 0.0821977C0.164614 0.212966 0 0.479117 0 0.769883L0 19.2312C0 19.522 0.164614 19.7882 0.424611 19.9189C0.533841 19.9728 0.652301 20.0005 0.769223 20.0005C0.932298 20.0005 1.09537 19.9482 1.23076 19.8466L13.5383 10.6159C13.7322 10.4713 13.846 10.2421 13.846 10.0006C13.846 9.75903 13.7322 9.5298 13.5383 9.38518Z" />
              <path d="M19.2308 0.000244141L17.6923 0.000244141C17.2677 0.000244141 16.9231 0.344856 16.9231 0.769467L16.9231 19.2308C16.9231 19.6554 17.2677 20 17.6923 20H19.2308C19.6554 20 20 19.6554 20 19.2308L20 0.769467C20 0.344856 19.6554 0.000244141 19.2308 0.000244141Z" />
            </svg>
          ),
          previous: (
            <svg
              viewBox="0 0 20 20"
              className={getAllowedClasses([
                styles.playerCommonBtn,
                styles.playerPreviousBtn,
              ])}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6.46168 10.6148L18.7692 19.8455C19 20.0209 19.3139 20.0486 19.5739 19.9178C19.8354 19.787 20 19.5209 20 19.2301L20 0.768761C20 0.477993 19.8354 0.211842 19.5754 0.0810737C19.4662 0.0272274 19.3477 -0.000463543 19.2308 -0.000463553C19.0677 -0.000463567 18.9046 0.0518435 18.7692 0.153381L6.46168 9.38406C6.26784 9.52867 6.15399 9.7579 6.15399 9.99944C6.15399 10.241 6.26784 10.4702 6.46168 10.6148Z" />
              <path d="M0.769233 19.9998L2.30768 19.9998C2.73229 19.9998 3.0769 19.6551 3.0769 19.2305L3.07691 0.769176C3.07691 0.344564 2.73229 -4.77138e-05 2.30768 -4.7751e-05L0.769235 -4.78855e-05C0.344623 -4.79226e-05 1.12551e-05 0.344564 1.12179e-05 0.769176L9.60399e-06 19.2305C9.56687e-06 19.6551 0.344622 19.9998 0.769233 19.9998Z" />
            </svg>
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
              <svg viewBox="0 0 18 23" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 4.6V1.22612C9 0.778011 8.45594 0.556149 8.14258 0.876471L3.71705 5.40035C3.52694 5.59469 3.52694 5.90531 3.71705 6.09965L8.14258 10.6235C8.45594 10.9439 9 10.722 9 10.2739V6C12.7238 6 16.5 9.9935 16.5 13.8C16.5 17.6065 12.7238 21.5 9 21.5C5.30883 21.5 1.56608 17.6743 1.50086 13.8999C1.49991 13.8447 1.45523 13.8 1.4 13.8H0C0 18.883 4.0275 23 9 23C13.9725 23 18 18.883 18 13.8C18 8.717 13.9725 4.6 9 4.6Z" />
              </svg>
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
              <svg viewBox="0 0 18 23" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 4.6V1.22612C9 0.778011 9.54406 0.556149 9.85742 0.876471L14.283 5.40035C14.4731 5.59469 14.4731 5.90531 14.283 6.09965L9.85742 10.6235C9.54406 10.9439 9 10.722 9 10.2739V6C5.27625 6 1.5 9.9935 1.5 13.8C1.5 17.6065 5.27625 21.5 9 21.5C12.6912 21.5 16.4339 17.6743 16.4991 13.8999C16.5001 13.8447 16.5448 13.8 16.6 13.8H18C18 18.883 13.9725 23 9 23C4.0275 23 0 18.883 0 13.8C0 8.717 4.0275 4.6 9 4.6Z" />
              </svg>
            </div>
          ),
          volume: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 480 480"
              className={styles.playerVolumeBtn}
            >
              <path d="M278.944 17.577c-5.568-2.656-12.128-1.952-16.928 1.92L106.368 144.009H32c-17.632 0-32 14.368-32 32v128c0 17.664 14.368 32 32 32h74.368l155.616 124.512A16.158 16.158 0 0 0 272 464.009c2.368 0 4.736-.544 6.944-1.6a15.968 15.968 0 0 0 9.056-14.4v-416a16.05 16.05 0 0 0-9.056-14.432zM368.992 126.857c-6.304-6.208-16.416-6.112-22.624.128-6.208 6.304-6.144 16.416.128 22.656C370.688 173.513 384 205.609 384 240.009s-13.312 66.496-37.504 90.368c-6.272 6.176-6.336 16.32-.128 22.624a15.943 15.943 0 0 0 11.36 4.736c4.064 0 8.128-1.536 11.264-4.64C399.328 323.241 416 283.049 416 240.009s-16.672-83.232-47.008-113.152z" />
              <path d="M414.144 81.769c-6.304-6.24-16.416-6.176-22.656.096-6.208 6.272-6.144 16.416.096 22.624C427.968 140.553 448 188.681 448 240.009s-20.032 99.424-56.416 135.488c-6.24 6.24-6.304 16.384-.096 22.656 3.168 3.136 7.264 4.704 11.36 4.704 4.064 0 8.16-1.536 11.296-4.64C456.64 356.137 480 299.945 480 240.009s-23.36-116.128-65.856-158.24z" />
            </svg>
          ),
          volumeMute: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 480 480"
              className={styles.playerVolumeBtn}
            >
              <path d="M278.9,17.6c-5.6-2.7-12.1-2-16.9,1.9L106.4,144H32c-17.6,0-32,14.4-32,32v128c0,17.7,14.4,32,32,32h74.4L262,460.5 c2.9,2.3,6.4,3.5,10,3.5c2.4,0,4.7-0.5,6.9-1.6c5.5-2.7,9.1-8.3,9.1-14.4V32C288,25.9,284.5,20.3,278.9,17.6z" />
            </svg>
          ),
        }}
      />
    );
  },
);

Player.displayName = 'Player';

export default Player;
export type { Ref as PlayerRef };
