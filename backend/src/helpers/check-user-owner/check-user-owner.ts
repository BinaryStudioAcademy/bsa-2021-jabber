import { podcast as podcastService } from '~/services/services';

const checkUserOwner = async (podcastId: string, requestUserId: number | undefined): Promise<boolean> => {
  const { userId: podcastOwnerId } = await podcastService.getById(podcastId);
  return requestUserId === podcastOwnerId;
};

export { checkUserOwner };
