import { parse } from 'query-string';

const parseQueryString = (query: string): Record<string, unknown> => parse(query, { arrayFormat: 'bracket' });

export { parseQueryString };
