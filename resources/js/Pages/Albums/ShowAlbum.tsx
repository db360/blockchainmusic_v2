
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

import { IoPlayCircleOutline, IoPauseCircleOutline } from "react-icons/io5";

import { TbCash, TbShoppingCart } from "react-icons/tb";
import { Album, Like, Song, Songs, User } from "@/types";
import { AppDispatch, RootState } from "@/src/store/store";
import { useDispatch, useSelector } from "react-redux";
import { updatePlayback } from "@/src/store/audio/audioSlice";
import { playQueue, playSong } from "@/src/store/audio/thunks";
import { useCart } from "react-use-cart";
import LikeButtonLink from "@/Components/Favorite/LikeButtonLink";



export default function ShowAlbum({ album, user, songs, userLikes }:{album:Album, user:User, songs:Songs, userLikes: Like[]}) {

    const dispatch: AppDispatch = useDispatch();
    const {currentSong, playback, queue, settings} = useSelector((state: RootState)  => state.audio);

    const {addItem} = useCart();

    // console.log('Current SONG: ', currentSong)
    // console.log('playback: ', playback)
    // console.log('queue: ', queue)
    // console.log('settings: ', settings)

    const handleAddToQueue = () => {
        dispatch(playQueue(songs));
        // console.log(queue);
      };

      const handlePlayPause = (song: Song) => {
        if (currentSong?.id === song.id && currentSong?.id) {
          dispatch(updatePlayback({currentTime: playback.currentTime, duration: playback.duration, isMuted: playback.isMuted, isPlaying: playback.isPlaying, volume: playback.volume}));
        } else {
          dispatch(playSong(song));
        }
      };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    {album.title}
                </h2>
            }
        >
            <Head title={album.title} />
            {/* {console.log(songs)} */}

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="flex w-full">
                                <div onClick={handleAddToQueue} className="hover:cursor-pointer">
                                    <img
                                        className="w-60"
                                        src={album.cover_image ?? 'NO IMAGE'}
                                        alt=""
                                    />
                                </div>
                                <div className="flex flex-col w-full ml-3">
                                    <span className="text-gray-300">Album</span>
                                    <h3 className="text-5xl">{album.title}</h3>
                                    <div className="mt-5 flex items-center">
                                        <img
                                            className="w-10 h-10 rounded-full"
                                            src={user.profile_picture}
                                            alt=""
                                        />
                                        <p className="text-gray-300 ml-2">
                                            {user.name}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="relative overflow-x-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Nº
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Title
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Like
                                        </th>
                                        <th>Duration</th>
                                        <th scope="col" className="px-6 py-3">
                                            Price
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Play
                                        </th>
                                        {user.role === "user" ? (
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Buy
                                            </th>
                                        ) : null}
                                        <th>Buy</th>
                                    </tr>
                                </thead>


                                <tbody>
                                    {songs && songs.length > 0 ? (
                                        songs.map((song) => (
                                            <tr
                                                key={song.id}
                                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                            >
                                                <td
                                                    scope="row"
                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                >
                                                    {song.track_number}
                                                </td>
                                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex gap-4">
                                                    <p>{song.title}</p>

                                                </td>
                                                <td className="px-6 py-4">
                                                <LikeButtonLink album={null} song={song} type="song" userLikes={userLikes}/>
                                                </td>

                                                <td className="px-6 py-4">
                                                    {song.duration}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {song.price}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <button
                                                        onClick={() =>
                                                            handlePlayPause(
                                                                song
                                                            )
                                                        }
                                                    >
                                                        {currentSong?.id ===
                                                            song.id &&
                                                        playback.isPlaying ? (
                                                            <IoPauseCircleOutline className="text-2xl hover:text-orange-500" />
                                                        ) : (
                                                            <IoPlayCircleOutline className="text-2xl hover:text-green-500" />
                                                        )}
                                                    </button>
                                                </td>
                                                {user.role === "user" ? (
                                                    <td  className="px-6 py-4">
                                                        <button title="buy"><TbCash className="hover:text-green-500 text-center text-2xl"/></button>
                                                    </td>
                                                ) : null}
                                                <td><Link href="" onClick={() => addItem( {
                                                    id: song.id.toString(),
                                                    price: song.price,
                                                    name: song.title,
                                                    type: 'Song',
                                                    cover_image: album.cover_image
                                                }, 1)}><TbShoppingCart  className="hover:text-green-500 text-center text-2xl"/></Link></td>
                                            </tr>
                                        ))
                                    ) : (
                                        <p>No Songs found.</p>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
