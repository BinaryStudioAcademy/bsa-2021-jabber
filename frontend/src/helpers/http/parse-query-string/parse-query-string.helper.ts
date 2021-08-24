import { parse, ParsedQuery } from 'query-string';

const parseQueryString = (query: string): ParsedQuery<string | boolean | number> => parse(query, { arrayFormat: 'bracket' });

export { parseQueryString };
