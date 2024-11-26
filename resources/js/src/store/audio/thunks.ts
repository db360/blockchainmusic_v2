import { Song } from "@/types";
import { AppDispatch, RootState } from "../store";
import { setQueue, setCurrentSong, updatePlayback } from "./audioSlice";

export const playSong = (song: Song) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState().audio;

    if (state.currentSong?.id === song.id) {
      dispatch(updatePlayback({ isPlaying: true }));
      return;
    }

    dispatch(setCurrentSong(song));
    dispatch(updatePlayback({
      isPlaying: true,
      currentTime: 0,
      duration: 0
    }));
  };

export const playQueue = (songs: Song[], startIndex: number = 0) =>
  async (dispatch: AppDispatch) => {
    dispatch(setQueue(songs));
    dispatch(playSong(songs[startIndex]));
  };

export const playNext = () =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const { queue, currentSong, settings } = getState().audio;
    if (!currentSong) return;

    const currentIndex = queue.findIndex(song => song.id === currentSong.id);
    let nextSong: Song | undefined;

    if (settings.shuffleMode) {
      const remainingSongs = queue.filter((_, index) => index !== currentIndex);
      nextSong = remainingSongs[Math.floor(Math.random() * remainingSongs.length)];
    } else {
      nextSong = currentIndex < queue.length - 1
        ? queue[currentIndex + 1]
        : settings.repeatMode === 'ALL'
          ? queue[0]
          : undefined;
    }

    if (nextSong) {
      dispatch(playSong(nextSong));
    } else {
      dispatch(updatePlayback({ isPlaying: false }));
    }
  };