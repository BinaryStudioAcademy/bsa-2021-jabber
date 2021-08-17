
import { FieldValues, UnpackNestedValue } from 'react-hook-form';
import { PodcastBySearchPayload } from 'common/types/types';

const convertToPodcastType = (pref: UnpackNestedValue<FieldValues>): PodcastBySearchPayload => {
  return { search: pref.search };
};

export { convertToPodcastType };
