import { Playlist } from "@/types";
import { Link } from "@inertiajs/react";

export default function PlaylistCard({playlist}:{playlist: Playlist}) {
    return (
        <div className="bg-slate-800 p-2">
            <div className="">
            <img src={playlist.cover_image} alt="" />
            </div>
            <div>

            </div>
            <div>
                {playlist.songs.map((song, index) => (
                <div className="flex justify-between p-1">
                    <Link href={song.song_signed_url}>
                        <p key={index} className="text-gray-300">{song.title}</p>
                    </Link>
                    <p className="text-gray-300">{song.duration}</p>
                </div>
                ))}
            </div>
        </div>
    )
}