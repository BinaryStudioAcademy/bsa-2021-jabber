import { createAction } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { ActionType } from './common';

const setPlayerStatus = createAction<DataStatus>(ActionType.SET_PLAYER_STATUS);
const resetPlayer = createAction(ActionType.RESET_PLAYER);

export { setPlayerStatus, resetPlayer };
