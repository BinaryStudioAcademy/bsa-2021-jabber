import { createReducer } from '@reduxjs/toolkit';
import { increment, decrement, incrementByAmount } from './actions';

type State = {
  value: number;
};

const initialState: State = {
  value: 0,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(increment, (state) => {
    state.value += 1;
  });
  builder.addCase(decrement, (state) => {
    state.value -= 1;
  });
  builder.addCase(incrementByAmount, (state, action) => {
    state.value += action.payload;
  });
});

export { reducer };
