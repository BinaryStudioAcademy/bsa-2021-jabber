import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { Podcast, Episode } from 'common/types/types';
import {
  loadPodcast,
  loadEpisodesByPodcastId,
  checkIsFollowedPodcast,
  getFollowersCount,
  toggleFollowPodcast,
} from './actions';

type State = {
  dataStatus: DataStatus;
  followersDataStatus: DataStatus;
  episodesDataStatus: DataStatus;
  podcast: Podcast | null;
  episodes: Episode[];
  isFollowed: boolean;
  followersCount: number;
  totalCount: number;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  followersDataStatus: DataStatus.IDLE,
  episodesDataStatus: DataStatus.IDLE,
  podcast: null,
  episodes: [],
  totalCount: 0,
  isFollowed: false,
  followersCount: 0,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(loadPodcast.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(loadPodcast.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.podcast = action.payload;
  });
  builder.addCase(loadPodcast.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });

  builder.addCase(loadEpisodesByPodcastId.pending, (state) => {
    state.episodesDataStatus = DataStatus.PENDING;
  });
  builder.addCase(loadEpisodesByPodcastId.fulfilled, (state, action) => {
    state.episodesDataStatus = DataStatus.FULFILLED;
    state.episodes = action.payload.results;
    state.totalCount = action.payload.totalCount;
  });
  builder.addCase(loadEpisodesByPodcastId.rejected, (state) => {
    state.episodesDataStatus = DataStatus.REJECTED;
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
  builder.addCase(checkIsFollowedPodcast.pending, (state) => {
    state.followersDataStatus = DataStatus.PENDING;
  });
  builder.addCase(checkIsFollowedPodcast.fulfilled, (state, action) => {
    state.followersDataStatus = DataStatus.FULFILLED;
    state.isFollowed = action.payload;
  });
  builder.addCase(checkIsFollowedPodcast.rejected, (state) => {
    state.followersDataStatus = DataStatus.REJECTED;
  });
  builder.addCase(toggleFollowPodcast.fulfilled, (state, action) => {
    state.isFollowed = action.payload;

    action.payload ? state.followersCount++ : state.followersCount--;
  });
});

export { reducer };
