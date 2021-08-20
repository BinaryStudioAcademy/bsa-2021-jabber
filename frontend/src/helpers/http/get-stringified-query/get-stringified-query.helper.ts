import { stringify } from 'query-string';

const getStringifiedQuery = (query: Record<string, string | number | number[]>): string => stringify(query, { arrayFormat: 'bracket' });

export { getStringifiedQuery };
