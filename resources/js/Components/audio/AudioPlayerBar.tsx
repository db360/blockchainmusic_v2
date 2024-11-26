import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAudio } from '@/context/AudioPlayerContext';
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { AppDispatch, RootState } from '@/src/store/store';
import { updatePlayback } from '@/src/store/audio/audioSlice';
import { playNext } from '@/src/store/audio/thunks';

// Custom hook to combine Redux and Context functionality
export const useAudioPlayer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const audioContext = useAudio();
  const { currentSong, playback, settings } = useSelector((state: RootState) => state.audio);

  const handlePlay = async () => {
    await audioContext.play();
    dispatch(updatePlayback({ isPlaying: true }));
  };

  const handlePause = () => {
    audioContext.pause();
    dispatch(updatePlayback({ isPlaying: false }));
  };

  const handleEnded = () => {
    dispatch(playNext());
    console.log('ENDED')

  };

  const handleTimeUpdate = (e: Event) => {
    const audioElement = e.target as HTMLAudioElement;
    dispatch(updatePlayback({ currentTime: audioElement.currentTime }));
  };

  const handleVolumeChange = (volume: number) => {
    audioContext.setVolume(volume);
    dispatch(updatePlayback({ volume }));
  };

  return {
    currentSong,
    playback,
    settings,
    handlePlay,
    handlePause,
    handleEnded,
    handleTimeUpdate,
    handleVolumeChange,
  };
};

// Audio Player Component
export const AudioPlayerBar: React.FC = () => {
  const {
    currentSong,
    playback,
    handlePlay,
    handlePause,
    handleEnded,
    handleTimeUpdate,
    handleVolumeChange,
  } = useAudioPlayer();

  if (!currentSong) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full bg-white shadow-lg z-50 dark:bg-gray-800">
      <div className="h-6 bg-slate-300 dark:bg-gray-700">
        <p className="text-center truncate px-2 dark:text-gray-200">
          {currentSong.title}
        </p>
      </div>
      <AudioPlayer
        autoPlay={playback.isPlaying}
        src={currentSong.song_signed_url}
        onPlay={handlePlay}
        onPause={handlePause}
        onEnded={handleEnded}
        onListen={handleTimeUpdate}
        onVolumeChange={(e) => {
          const audioElement = e.target as HTMLAudioElement;
          handleVolumeChange(audioElement.volume);
        }}
        showJumpControls={true}
        showFilledVolume={true}
        volume={playback.volume}
        defaultCurrentTime={playback.currentTime}
        customControlsSection={[
          RHAP_UI.MAIN_CONTROLS,
          RHAP_UI.VOLUME_CONTROLS,
        ]}
      />
    </div>
  );
};