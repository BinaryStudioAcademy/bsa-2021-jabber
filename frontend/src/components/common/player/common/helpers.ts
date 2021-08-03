import {
  MAX_RATE_STEP_ANGLE_IN_DEGREES,
  MIDDLE_RATE_STEP,
  RATE_STEPS,
} from './constants';

const getRateStepAngle = (rateIndex: number): number => {
  const middleRateIndex = RATE_STEPS.map(Number).indexOf(MIDDLE_RATE_STEP);

  if (rateIndex > middleRateIndex) {
    const stepsCountAfterMiddleRate = RATE_STEPS.length - middleRateIndex - 1;
    return (
      (MAX_RATE_STEP_ANGLE_IN_DEGREES / stepsCountAfterMiddleRate) *
      (rateIndex - middleRateIndex)
    );
  }

  if (rateIndex < middleRateIndex) {
    const stepsCountBeforeMiddleRate = middleRateIndex;
    return (
      -(MAX_RATE_STEP_ANGLE_IN_DEGREES / stepsCountBeforeMiddleRate) *
      (stepsCountBeforeMiddleRate - rateIndex)
    );
  }

  return 0;
};

const getRatePointerStyle = (rateIndex: number): { transform: string } => ({
  transform: `translate(-50%, -50%) rotate(${getRateStepAngle(rateIndex)}deg)`,
});

export { getRatePointerStyle };
