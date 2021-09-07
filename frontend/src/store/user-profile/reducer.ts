import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { Podcast, User, EpisodeWithPodcast } from 'common/types/types';
import {
  loadPodcasts,
  loadUser,
  getFollowersCount,
  checkIsFollowedUser,
  toggleFollowUser,
  loadFollowersByUserId,
  loadFavouriteEpisodes,
} from './actions';

type State = {
  userDataStatus: DataStatus;
  podcastsDataStatus: DataStatus;
  followersDataStatus: DataStatus;
  favoriteEpisodesDataStatus: DataStatus;
  podcasts: Podcast[];
  user: User | null;
  isFollowed: boolean;
  followersCount: number;
  followers: User[];
  favoriteEpisodes: EpisodeWithPodcast[];
  favoriteEpisodesTotalCount: number;
};

const initialState: State = {
  userDataStatus: DataStatus.IDLE,
  podcastsDataStatus: DataStatus.IDLE,
  followersDataStatus: DataStatus.IDLE,
  favoriteEpisodesDataStatus: DataStatus.IDLE,
  podcasts: [],
  user: null,
  isFollowed: false,
  followersCount: 0,
  followers: [],
  favoriteEpisodes: [],
  favoriteEpisodesTotalCount: 0,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(loadPodcasts.pending, (state) => {
    state.podcastsDataStatus = DataStatus.PENDING;
  });
  builder.addCase(loadPodcasts.fulfilled, (state, action) => {
    state.podcastsDataStatus = DataStatus.FULFILLED;
    state.podcasts = action.payload;
  });
  builder.addCase(loadPodcasts.rejected, (state) => {
    state.podcastsDataStatus = DataStatus.REJECTED;
  });
  builder.addCase(loadUser.pending, (state) => {
    state.userDataStatus = DataStatus.PENDING;
  });
  builder.addCase(loadUser.fulfilled, (state, action) => {
    state.userDataStatus = DataStatus.FULFILLED;
    state.user = action.payload;
  });
  builder.addCase(loadUser.rejected, (state) => {
    state.userDataStatus = DataStatus.REJECTED;
    state.user = null;
  });
  builder.addCase(getFollowersCount.pending, (state) => {
    state.followersDataStatus = DataStatus.PENDING;
  });
  builder.addCase(getFollowersCount.fulfilled, (state, action) => {
    state.followersDataStatus = DataStatus.FULFILLED;
    state.followersCount = action.payload;
  });
  builder.addCase(getFollowersCount.rejected, (state) => {
    state.followersDataStatus = DataStatus.REJECTED;
  });
  builder.addCase(checkIsFollowedUser.pending, (state) => {
    state.followersDataStatus = DataStatus.PENDING;
  });
  builder.addCase(checkIsFollowedUser.fulfilled, (state, action) => {
    state.followersDataStatus = DataStatus.FULFILLED;
    state.isFollowed = action.payload;
  });
  builder.addCase(checkIsFollowedUser.rejected, (state) => {
    state.followersDataStatus = DataStatus.REJECTED;
  });
  builder.addCase(toggleFollowUser.fulfilled, (state, action) => {
    state.isFollowed = action.payload;

    action.payload ? state.followersCount++ : state.followersCount--;
  });

  builder.addCase(loadFollowersByUserId.pending, (state) => {
    state.followersDataStatus = DataStatus.PENDING;
  });
  builder.addCase(loadFollowersByUserId.fulfilled, (state, action) => {
    state.followersDataStatus = DataStatus.FULFILLED;
    state.followers = action.payload;
  });
  builder.addCase(loadFollowersByUserId.rejected, (state) => {
    state.followersDataStatus = DataStatus.REJECTED;
  });

  builder.addCase(loadFavouriteEpisodes.pending, (state) => {
    state.favoriteEpisodesDataStatus = DataStatus.PENDING;
  });
  builder.addCase(loadFavouriteEpisodes.fulfilled, (state, action) => {
    state.favoriteEpisodesDataStatus = DataStatus.FULFILLED;

    const { episodes, totalCount } = action.payload;

    state.favoriteEpisodes = episodes;
    state.favoriteEpisodesTotalCount = totalCount;
  });
  builder.addCase(loadFavouriteEpisodes.rejected, (state) => {
    state.favoriteEpisodesDataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
