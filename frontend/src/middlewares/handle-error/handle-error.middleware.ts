import { Middleware } from '@reduxjs/toolkit';
import { notification as notificationService } from 'services/services';

const handleError: Middleware = () => (next) => (action): void => {
  const hasErrorMessage = Boolean(action?.error?.message);
  
  if (hasErrorMessage) {
    notificationService.error('Error', action.payload.error.message);
  }
  
  next(action);
};

export { handleError };
