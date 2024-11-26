import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Song } from '@/types';

interface SongsState {
    list: Song[];
    loading: boolean;
    error: string | null;
}

const initialState: SongsState = {
    list: [],
    loading: false,
    error: null
};

export const songsSlice = createSlice({
    name: 'songs',
    initialState,
    reducers: {
        setSongs: (state, action: PayloadAction<Song[]>) => {
            state.list = action.payload;
        },
    }
});

export const { setSongs } = songsSlice.actions;