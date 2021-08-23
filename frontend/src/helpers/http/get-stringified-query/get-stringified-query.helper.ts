import { stringify } from 'query-string';

const getStringifiedQuery = (query: Record<string, unknown>): string => stringify(query, { arrayFormat: 'bracket' });

export { getStringifiedQuery };
