import { ShownotePayload } from './shownote';

type ShownoteRecord = ShownotePayload & Record<'id', string>;

export type { ShownoteRecord };
