import { getDataUrl } from 'helpers/helpers';

const getDataUrlFromBlobUrl = async (url: string): Promise<string> => {
  const res = await fetch(url);
  const blob = await res.blob();

  return await getDataUrl(blob);
};

export { getDataUrlFromBlobUrl };
