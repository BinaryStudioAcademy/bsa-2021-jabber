import { RateStep } from './enums';
import {
  ARRAY_SHIFT,
  MAX_RATE_STEP_ANGLE_IN_DEGREES,
  MIDDLE_RATE_STEP_ANGLE_IN_DEGREES,
} from './constants';

const rateSteps = Object.values(RateStep);

const getRateStepAngle = (rateIndex: number): number => {
  const middleRateIndex = rateSteps.indexOf(RateStep.NORMAL);

  if (rateIndex > middleRateIndex) {
    const stepsCountAfterMiddleRate =
      rateSteps.length - middleRateIndex - ARRAY_SHIFT;

    return (
      (MAX_RATE_STEP_ANGLE_IN_DEGREES / stepsCountAfterMiddleRate) *
        (rateIndex - middleRateIndex) +
      MIDDLE_RATE_STEP_ANGLE_IN_DEGREES
    );
  }

  if (rateIndex < middleRateIndex) {
    const stepsCountBeforeMiddleRate = middleRateIndex;

    return (
      -(MAX_RATE_STEP_ANGLE_IN_DEGREES / stepsCountBeforeMiddleRate) *
        (stepsCountBeforeMiddleRate - rateIndex) +
      MIDDLE_RATE_STEP_ANGLE_IN_DEGREES
    );
  }

  return MIDDLE_RATE_STEP_ANGLE_IN_DEGREES;
};

const getRatePointerStyle = (rateIndex: number): { transform: string } => ({
  transform: `translate(-50%, -50%) rotate(${getRateStepAngle(rateIndex)}deg)`,
});

export { getRatePointerStyle };
