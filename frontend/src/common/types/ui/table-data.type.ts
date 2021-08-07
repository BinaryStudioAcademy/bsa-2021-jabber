import { EpisodeCreatePayloadKey } from 'common/enums/enums';

type EpisodeItem = {
  [EpisodeCreatePayloadKey.NAME]: string;
  [EpisodeCreatePayloadKey.DESCRIPTION]: string;
};

type ITableData = EpisodeItem;

export type { ITableData, EpisodeItem };
