import { Song } from "@/types";
import { RootState } from "../store";

export const selectAudioState = (state: RootState) => state.audio;
export const selectCurrentSong = ( state: RootState) =>
    state.audio.currentSong?.id
        ? state.songs?.list?.find((song: Song) => song.id === state.audio.currentSong?.id)
        : null;

export const selectQueue = (state: RootState) => state.audio.queue;