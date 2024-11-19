import { configureStore } from "@reduxjs/toolkit";
import { audioSlice } from "./audio/audioSlice";
import { songsSlice } from "./songs/songSlice";

export const store = configureStore({
    reducer: {
        audio: audioSlice.reducer,
        songs: songsSlice.reducer,
    },
    middleware: (getDefaultMiddleWare) =>
        getDefaultMiddleWare({
            serializableCheck: {
                ignoredActions: ['audio/setPlayerRef']
            }
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;