import PlaylistCard from "@/Components/Playlists/PlaylistCard";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Playlist } from "@/types";



export default function Library({ userFavAlbums, userFavSongs, userPlaylists }:{userPlaylists: Playlist[]}) {

    console.log(userFavAlbums)
    console.log(userFavSongs)
    console.log(userPlaylists)

    return (
        <Authenticated
        header={
            <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                MY LIBRARY
            </h2>}
        >
            <h2 className="dark:text-gray-300 text-center p-3">MY PLAYLISTS</h2>
<div className="grid grid-cols-5 grid-rows-4 gap-4 px-4">
{userPlaylists && userPlaylists.length > 0 ? (
                userPlaylists.map((playlists, index) => (

                    <PlaylistCard key={index} playlist={playlists}/>
                ))
            ) : (
                "NO HAY NINGUNA PLAYLIST"
            )}
</div>


        </Authenticated>
    )
}