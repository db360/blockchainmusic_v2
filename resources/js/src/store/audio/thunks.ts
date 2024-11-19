import { Song } from "@/types";
import { AppDispatch, RootState } from "../store";
import { setPlayingState, togglePlay } from './audioSlice';


// Thunks
export const handlePlayPause = (song: Song) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
      const state = getState().audio;
      const audioElement = state.playerRef?.current?.audio.current;


      if (state.playingSongId === song.id && audioElement) {
          if (state.isPlaying) {
              audioElement.pause();
              dispatch(togglePlay(false));
          } else {
              try {
                  await audioElement.play();
                  dispatch(togglePlay(true));
              } catch (error: unknown) {
                  console.error("Error playing audio:", error);
                  dispatch(togglePlay(false));
              }
          }
      } else {
          dispatch(setPlayingState({
              url: song.song_signed_url,
              songId: song.id,
              title: song.title,
              isPlaying: true
          }));

          setTimeout(async () => {
              const newAudioElement = state.playerRef?.current?.audio.current;
              if (newAudioElement) {
                  try {
                      await newAudioElement.play();
                  } catch (error: unknown) {
                      console.error("Error playing audio:", error);
                      dispatch(togglePlay(false));
                  }
              }
          }, 100);
      }
  };

export const playNext = () =>
  (dispatch: AppDispatch, getState: () => RootState) => {
      const state = getState().audio;
      const currentIndex = state.queue.findIndex(song => song.id === state.playingSongId);

      if (state.shuffleMode) {
          const remainingSongs = state.queue.slice(currentIndex + 1);
          if (remainingSongs.length > 0) {
              const randomIndex = Math.floor(Math.random() * remainingSongs.length);
              dispatch(handlePlayPause(remainingSongs[randomIndex]));
          }
      } else if (currentIndex < state.queue.length - 1) {
          dispatch(handlePlayPause(state.queue[currentIndex + 1]));
      } else if (state.repeatMode === 'ALL') {
          dispatch(handlePlayPause(state.queue[0]));
      }
  };