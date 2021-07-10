import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { ActionType } from './common';

const increment = createAction(ActionType.INCREMENT);

const decrement = createAction(ActionType.DECREMENT);

const incrementByAmount = createAction<number>(ActionType.INCREMENT_BY_AMOUNT);

const incrementAsync = createAsyncThunk(
  ActionType.INCREMENT_BY_AMOUNT,
  (amount: number, { dispatch }) => {
    setTimeout(() => {
      dispatch(incrementByAmount(amount));
    }, 1000);
  },
);

export { increment, decrement, incrementByAmount, incrementAsync };
