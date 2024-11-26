import { Song } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AudioState {
    queue: Song[];
    currentSong: Song | null;
    playback: {
        isPlaying: boolean;
        currentTime: number;
        duration: number;
        volume: number;
        isMuted: boolean;
    };
    settings: {
        repeatMode: "OFF" | "ONE" | "ALL";
        shuffleMode: boolean;
    };
}

const initialState: AudioState = {
    queue: [],
    currentSong: null,
    playback: {
        isPlaying: false,
        currentTime: 0,
        duration: 0,
        volume: 1,
        isMuted: false,
    },
    settings: {
        repeatMode: "OFF",
        shuffleMode: false,
    },
};

export const audioSlice = createSlice({
    name: "audio",
    initialState,
    reducers: {
        setQueue: (state, action: PayloadAction<Song[]>) => {
            state.queue = action.payload;
        },
        setCurrentSong: (state, action: PayloadAction<Song>) => {
            state.currentSong = action.payload;
        },
        updatePlayback: (
            state,
            action: PayloadAction<Partial<AudioState["playback"]>>
        ) => {
            state.playback = { ...state.playback, ...action.payload };
        },
        updateSettings: (
            state,
            action: PayloadAction<Partial<AudioState["settings"]>>
        ) => {
            state.settings = { ...state.settings, ...action.payload };
        },
    },
});

export const { setQueue, setCurrentSong, updatePlayback, updateSettings } =
    audioSlice.actions;
