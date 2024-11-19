import { AudioState, Song } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RefObject } from "react";
import H5AudioPlayer from "react-h5-audio-player";

// Tipo serializable para la referencia del reproductor
type SerializablePlayerRef = {
    src?: string;
    currentTime?: number;
    duration?: number;
};



const initialState: AudioState = {
    urlPlay: "",
    playingSongId: null,
    isPlaying: false,
    titleSongPlaying: "",
    playerRef: null,
    serializablePlayerRef: null,
    currentTime: 0,
    duration: 0,
    volume: 1,
    isMuted: false,
    isLoading: false,
    error: null,
    queue: [],
    repeatMode: 'OFF',
    shuffleMode: false
};

export const audioSlice = createSlice({
    name: "audio",
    initialState,
    reducers: {
        setPlayerRef: {
            reducer: (state, action: PayloadAction<SerializablePlayerRef | null>) => {
                state.serializablePlayerRef = action.payload;
            },
            prepare: (playerRef: RefObject<H5AudioPlayer> | null) => {
                // Extraer solo la información serializable
                const serializableRef = playerRef?.current ? {
                    src: playerRef.current.audio.current?.src,
                    currentTime: playerRef.current.audio.current?.currentTime,
                    duration: playerRef.current.audio.current?.duration
                } : null;

                return {
                    payload: serializableRef,
                    meta: { serializableCheck: false }
                };
            }
        },
        setPlayingState: (state, action: PayloadAction<{
            url: string;
            songId: number;
            title: string;
            isPlaying: boolean;
        }>) => {
            const {url, songId, title, isPlaying} = action.payload;
            state.urlPlay = url;
            state.playingSongId = songId;
            state.titleSongPlaying = title;
            state.isPlaying = isPlaying;
            state.isLoading = false;
            state.error = null;
        },
        togglePlay: (state, action: PayloadAction<boolean>) => {
            state.isPlaying = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        updateTime: (state, action: PayloadAction<number>) => {
            state.currentTime = action.payload
        },
        updateDuration: (state, action: PayloadAction<number>) => {
            state.duration = action.payload
        },
        setVolume: (state, action: PayloadAction<number>) => {
            state.volume = action.payload;
            if(state.volume > 0) state.isMuted = false;
        },
        toggleMute: (state) => {
            state.isMuted = !state.isMuted;
        },
        addToQueue: (state, action: PayloadAction<Song>) => {
            state.queue.push(action.payload);
        },
        removeFromQueue: (state, action: PayloadAction<number>) => {
            state.queue = state.queue.filter(song => song.id !== action.payload);
        },
        clearQueue: (state) => {
            state.queue = [];
        },
        toggleRepeatMode: (state) => {
            const modes: ('OFF' | 'ONE' | 'ALL')[] = ['OFF', 'ONE', 'ALL'];
            const currentIndex = modes.indexOf(state.repeatMode);
            state.repeatMode = modes[(currentIndex + 1) % modes.length];
        },
        toggleShuffle: (state) => {
            state.shuffleMode = !state.shuffleMode;
        },
        resetPlayer: (state) => {
            return { ...initialState, playerRef: state.playerRef };
        }
    },

});

// Exportar las acciones
export const {
    setPlayingState,
    togglePlay,  // Ahora coincide con el nombre del reducer
    setPlayerRef,
    setLoading,
    setError,
    updateTime,
    updateDuration,
    setVolume,
    toggleMute,
    addToQueue,
    removeFromQueue,
    clearQueue,
    toggleRepeatMode,
    toggleShuffle,
    resetPlayer
} = audioSlice.actions;

