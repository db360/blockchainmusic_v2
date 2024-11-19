import { PropsWithChildren, ReactNode, useContext, useState, useEffect, useRef } from "react";
import { Link, usePage } from "@inertiajs/react";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import { useDispatch, useSelector } from "react-redux";
import {
    setPlayerRef,
    togglePlay,
    setPlayingState,
    updateTime,
    updateDuration
} from "@/src/store/audio/audioSlice";
import type H5AudioPlayer from "react-h5-audio-player";
import { RootState } from "@/src/store/store";

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;
    const dispatch = useDispatch();
    const playerRef = useRef<H5AudioPlayer>(null);

    // Redux selectors
    const { isPlaying, urlPlay, titleSongPlaying, playingSongId } = useSelector((state: RootState) => state.audio);

    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    // Set player reference when component mounts
    useEffect(() => {
        const currentRef = playerRef.current ? { current: playerRef.current } : null;
        dispatch(setPlayerRef(currentRef));

        return () => {
            dispatch(setPlayerRef({ current: null }));
        };
    }, [dispatch]);

    // Handle player events
    const handlePlay = () => {
        dispatch(togglePlay(true));
    };

    const handlePause = () => {
        dispatch(togglePlay(false));
    };

    const handleEnded = () => {
        dispatch(togglePlay(false));
    };

    // Manejadores de tiempo actualizados con los tipos correctos
    const handleListen = () => {
        if (playerRef.current) {
            dispatch(updateTime(playerRef.current.audio.current?.currentTime || 0));
        }
    };

    const handleLoadedData = () => {
        if (playerRef.current) {
            dispatch(updateDuration(playerRef.current.audio.current?.duration || 0));
        }
    };

    return (
        <div className="h-full min-h-screen bg-gray-100 dark:bg-gray-900">
            {/* ... previous JSX remains the same ... */}

            <main className="overflow-hidden">{children}</main>
            <div className="fixed bottom-0 w-full transition-all">
                <div className="h-6 bg-slate-300">
                    <p className="text-center">{titleSongPlaying}</p>
                </div>
                <AudioPlayer
                    autoPlay={isPlaying}
                    src={urlPlay}
                    ref={playerRef}
                    onPlay={handlePlay}
                    onPause={handlePause}
                    onEnded={handleEnded}
                    onListen={handleListen}
                    onLoadedData={handleLoadedData}
                    showJumpControls={true}
                    showFilledVolume={true}
                    // Configuración adicional opcional
                    listenInterval={1000} // Intervalo de actualización del tiempo en ms
                    customControlsSection={[
                        RHAP_UI.MAIN_CONTROLS,
                        RHAP_UI.VOLUME_CONTROLS,
                    ]}
                />
            </div>
        </div>
    );
}