import { Router } from 'express';
import {
  ApiPath,
  HttpCode,
  HttpMethod,
  PlaylistsApiPath,
} from '~/common/enums/enums';
import { handleAsyncApi } from '~/helpers/helpers';
import {
  playlist as playlistService,
  playlistEpisode as playlistEpisodeService,
} from '~/services/services';
import {
  checkAuth as checkAuthMiddleware,
  validateSchema as validateSchemaMiddleware,
  checkUserPlaylistOwner as checkUserPlaylistOwnerMiddleware,
  checkUserMatch as checkUserMatchMiddleware,
} from '~/middlewares/middlewares';
import {
  playlistCreate as playlistCreateValidationSchema,
  playlistEpisode as playlistEpisodeValidationSchema,
  playlistEdit as playlistEditValidationSchema,
} from '~/validation-schemas/validation-schemas';
import {checkUserHasPermitToPlaylist} from "~/middlewares/check-user-has-permit-to-playlist/check-user-has-permit-to-podcast.middleware";

type Args = {
  apiRouter: Router;
  playlistService: typeof playlistService;
  playlistEpisodeService: typeof playlistEpisodeService;
};

const initPlaylistsApi = ({ apiRouter, playlistService, playlistEpisodeService }: Args): Router => {
  const playlistRouter = Router();

  apiRouter.use(ApiPath.PLAYLISTS, playlistRouter);

  playlistRouter.get(
    PlaylistsApiPath.POPULAR,
    handleAsyncApi(async (_req, res) => {
      return res
        .json(await playlistService.getPopular())
        .status(HttpCode.OK);
    }),
  );

  playlistRouter.get(
    PlaylistsApiPath.$ID,
    checkUserHasPermitToPlaylist(),
    handleAsyncApi(async (req, res) => {
      return res
        .json(await playlistService.getById(Number(req.params.id)))
        .status(HttpCode.OK);
    }),
  );

  playlistRouter.get(
    PlaylistsApiPath.USERS_$USER_ID,
    checkAuthMiddleware(HttpMethod.GET),
    handleAsyncApi(async (req, res) => {
      return res
        .json(await playlistService.getAllByUserId(Number(req.params.userId), Number(req.user?.id)))
        .status(HttpCode.OK);
    }),
  );

  playlistRouter.post(
    PlaylistsApiPath.ROOT,
    checkAuthMiddleware(HttpMethod.POST),
    checkUserMatchMiddleware(),
    validateSchemaMiddleware(playlistCreateValidationSchema),
    handleAsyncApi(async (req, res) => {
      return res
        .json(await playlistService.create(req.body))
        .status(HttpCode.OK);
    }),
  );

  playlistRouter.post(
    PlaylistsApiPath.EPISODES,
    checkAuthMiddleware(HttpMethod.POST),
    checkUserPlaylistOwnerMiddleware(),
    validateSchemaMiddleware(playlistEpisodeValidationSchema),
    handleAsyncApi(async (req, res) => {
      return res
        .json(await playlistEpisodeService.create(req.body))
        .status(HttpCode.OK);
    }),
  );


  playlistRouter.get(
    PlaylistsApiPath.INVITE_$CODE,
    checkAuthMiddleware(HttpMethod.GET),
    handleAsyncApi(async (req, res) => {
      return res
        .json(await playlistService.invite(req.params.code));
    }),
  );

  playlistRouter.put(
    PlaylistsApiPath.$ID,
    checkAuthMiddleware(HttpMethod.PUT),
    checkUserPlaylistOwnerMiddleware(),
    validateSchemaMiddleware(playlistEditValidationSchema),
    handleAsyncApi(async (req, res) => {
      return res
        .json(await playlistService.update(req.params.id, req.body))
        .status(HttpCode.OK);
    }),
  );

  playlistRouter.delete(
    PlaylistsApiPath.EPISODES,
    checkAuthMiddleware(HttpMethod.DELETE),
    checkUserPlaylistOwnerMiddleware(),
    validateSchemaMiddleware(playlistEpisodeValidationSchema),
    handleAsyncApi(async (req, res) => {
      return res
        .json(await playlistEpisodeService.delete(req.body))
        .status(HttpCode.OK);
    }),
  );

  playlistRouter.delete(
    PlaylistsApiPath.$ID,
    checkAuthMiddleware(HttpMethod.DELETE),
    checkUserPlaylistOwnerMiddleware(),
    handleAsyncApi(async (req, res) => {
      return res
        .json(await playlistService.delete(Number(req.params.id)))
        .status(HttpCode.OK);
    }),
  );

  return playlistRouter;
};

export { initPlaylistsApi };
