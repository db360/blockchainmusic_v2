// AudioPlayerContext.tsx
import React, { createContext, PropsWithChildren } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Song } from '@/types';
import { setPlayingState } from '@/src/store/audio/audioSlice';
import { RootState } from '@/src/store/store';

export type AudioPlayerContextType = {
    handlePlayPause: (song: Song) => void;
    playingSongId: number | null;
    isPlaying: boolean;
};

export const AudioPlayerContext = createContext<AudioPlayerContextType>({
    handlePlayPause: () => {},
    playingSongId: null,
    isPlaying: false
});

export const AudioPlayerProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const dispatch = useDispatch();
    const { playingSongId, isPlaying } = useSelector((state: RootState) => state.audio);

    const handlePlayPause = (song: Song) => {
        // If the song is not currently playing or is a different song
        dispatch(setPlayingState({
            url: song.song_signed_url,
            songId: song.id,
            title: song.title,
            isPlaying: playingSongId !== song.id || !isPlaying
        }));
    };

    return (
        <AudioPlayerContext.Provider value={{
            handlePlayPause,
            playingSongId,
            isPlaying
        }}>
            {children}
        </AudioPlayerContext.Provider>
    );
};