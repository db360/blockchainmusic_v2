import React, { RefObject } from "react";

import { useRef, useState } from "react";
import H5AudioPlayer from "react-h5-audio-player";
import { Song } from "@/types";
import { AudioPlayerContext } from "./AudioPlayerContext";

export const AudioPlayerContextProvider: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    const [urlPlay, setURLPlay] = useState("");
    const [playingSongId, setPlayingSongId] = useState<number | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [titleSongPlaying, setTitleSongPlaying] = useState("");
    const playerRef: RefObject<H5AudioPlayer> = useRef(null);

    // const incrementPlayCount = useCallback((playingSongId: number) => {
    //     console.log('Attempting to increment play count for song:', playingSongId);

    //     router.visit(`/songs/${playingSongId}/increment-play-count`, {
    //         method: 'post',
    //         onSuccess: () => {
    //             console.log('Successfully incremented play count');
    //         },
    //         onError: (errors) => {
    //             console.error('Error incrementing play count:', errors);
    //         }
    //     });
    // }, []);


    const handlePlayPause = (song: Song) => {
        setTitleSongPlaying(song.title);
        const audioElement = playerRef.current?.audio.current;

        if (playingSongId === song.id && audioElement) {
            if (isPlaying) {
                audioElement.pause();
                setIsPlaying(false);
                setPlayingSongId(song.id);
            } else {
                void audioElement.play().catch((error) => {
                    console.error("Error playing audio:", error);
                    setIsPlaying(false);
                });
                setIsPlaying(true);
            }
        } else {
            setURLPlay(song.song_signed_url);
            setPlayingSongId(song.id);
            setIsPlaying(true);

            setTimeout(() => {
                const newAudioElement = playerRef.current?.audio.current;
                if (newAudioElement) {
                    void newAudioElement.play().catch(error => {
                        console.error("Error playing audio:", error);
                        setIsPlaying(false);
                    });
                }
            }, 100);
        }
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
        setIsPlaying(false);
        if(playingSongId) {
            // incrementPlayCount(playingSongId);
            setPlayingSongId(null);
        }
        setURLPlay("");
    };



    return (
        <AudioPlayerContext.Provider
            value={{
                urlPlay,
                playingSongId,
                isPlaying,
                titleSongPlaying,
                playerRef,
                setURLPlay,
                setPlayingSongId,
                setIsPlaying,
                handlePlayPause,
                handlePlay,
                handlePause,
                handleEnded,
            }}
        >
            {children}
        </AudioPlayerContext.Provider>
    );
};
