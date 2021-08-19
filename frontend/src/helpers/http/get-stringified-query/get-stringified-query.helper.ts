import { stringify } from 'query-string';

const getStringifiedQuery = (query: Record<string, string | number>): string => stringify(query);

export { getStringifiedQuery };
