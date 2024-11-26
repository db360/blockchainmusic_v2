// AudioContext.tsx
import { updatePlayback } from '@/src/store/audio/audioSlice';
import { playNext } from '@/src/store/audio/thunks';
import { AppDispatch, RootState } from '@/src/store/store';
import React, { createContext, useContext, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface AudioContextValue {
  audioRef: React.RefObject<HTMLAudioElement>;
  play: () => Promise<void>;
  pause: () => void;
  seekTo: (time: number) => void;
  setVolume: (volume: number) => void;
}

export const AudioPlayerContext  = createContext<AudioContextValue | null>(null);

export const AudioPlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const audioRef = useRef<HTMLAudioElement>(null);
  const { currentSong, playback } = useSelector((state: RootState) => state.audio);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlers = {
      timeupdate: () => dispatch(updatePlayback({ currentTime: audio.currentTime })),
      loadedmetadata: () => dispatch(updatePlayback({ duration: audio.duration })),
      ended: () => dispatch(playNext()),
      play: () => dispatch(updatePlayback({ isPlaying: true })),
      pause: () => dispatch(updatePlayback({ isPlaying: false })),
    };

    Object.entries(handlers).forEach(([event, handler]) => {
      audio.addEventListener(event, handler);
    });

    return () => {
      Object.entries(handlers).forEach(([event, handler]) => {
        audio.removeEventListener(event, handler);
      });
    };
  }, [dispatch]);

  // Update audio source when current song changes
  useEffect(() => {
    if (audioRef.current && currentSong) {
      audioRef.current.src = currentSong.url;
      if (playback.isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentSong, playback.isPlaying]);

  const value: AudioContextValue = {
    audioRef,
    play: async () => {
      if (audioRef.current) {
        await audioRef.current.play();
      }
      console.log(currentSong)
    },
    pause: () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    },
    seekTo: (time: number) => {
      if (audioRef.current) {
        audioRef.current.currentTime = time;
      }
    },
    setVolume: (volume: number) => {
      if (audioRef.current) {
        audioRef.current.volume = volume;
        dispatch(updatePlayback({ volume }));
      }
    },
  };

  return (
    <AudioPlayerContext.Provider value={value}>
      {children}
      <audio ref={audioRef} />
    </AudioPlayerContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};