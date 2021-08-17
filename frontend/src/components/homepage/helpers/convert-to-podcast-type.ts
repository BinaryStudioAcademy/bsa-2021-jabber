
import { FieldValues, UnpackNestedValue } from 'react-hook-form';
import { PodcastSearchPayload } from 'common/types/types';

const convertToPodcastType = (pref: UnpackNestedValue<FieldValues>): PodcastSearchPayload => {
  return { search: pref.search };
};

export { convertToPodcastType };
