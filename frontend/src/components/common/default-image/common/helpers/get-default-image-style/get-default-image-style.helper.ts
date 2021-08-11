import { DefaultImageSize } from 'common/enums/enums';
import React from 'react';
import {
  LARGE_DEFAULT_IMAGE,
  MEDIUM_DEFAULT_IMAGE,
  SMALL_DEFAULT_IMAGE,
} from '../../constants/constants';

const getDefaultImageStyle = (size: DefaultImageSize): React.CSSProperties => {
  switch (size) {
    case DefaultImageSize.SMALL: {
      return SMALL_DEFAULT_IMAGE;
    }
    case DefaultImageSize.MEDIUM: {
      return MEDIUM_DEFAULT_IMAGE;
    }
    case DefaultImageSize.LARGE: {
      return LARGE_DEFAULT_IMAGE;
    }
  }
};

export { getDefaultImageStyle };
