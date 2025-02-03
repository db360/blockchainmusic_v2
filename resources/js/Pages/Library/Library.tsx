import PlaylistCard from "@/Components/Playlists/PlaylistCard";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Album, Playlist, Song } from "@/types";

export default function Library({
    userFavorites,
    userPlaylists,
}: {
    userFavorites: {
        Song: Song[],
        Album: Album[]

}
    userPlaylists: Playlist[];
}) {
    console.log(userFavorites.Song);
    // console.log(userPlaylists)

    return (
        <Authenticated
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    MY LIBRARY
                </h2>
            }
        >
            <h2 className="dark:text-gray-300 text-center p-3">MY PLAYLISTS</h2>
            <div className="grid grid-cols-6 gap-4 px-4">
                {userPlaylists && userPlaylists.length > 0
                    ? userPlaylists.map((playlists, index) => (
                          <PlaylistCard key={index} playlist={playlists} />
                      ))
                    : "NO HAY NINGUNA PLAYLIST"}
            </div>
            <h2 className="dark:text-gray-300 text-center p-3">FAVORITE ALBUMS</h2>
            <div className="dark:text-gray-300 grid grid-cols-6 gap-4 px-4">
                {userFavorites.Album && userFavorites.Album.length > 0
                    ? userFavorites.Album.map((album, index) => (
                        <div key={index}>
                            <img alt="cover image" src={album.cover_image || ''}/>
                              <p className="text-sm">{album.title}</p>
                        </div>
                      ))
                    : "NO HAY NINGUN FAVORITO"}
            </div>
            <h2 className="dark:text-gray-300 text-center p-3">FAVORITE SONGS</h2>
            <div className="dark:text-gray-300 grid grid-cols-6 gap-4 px-4">
                {userFavorites.Song && userFavorites.Song.length > 0
                    ? userFavorites.Song.map((song, index) => (
                        <div  key={index}>
                        <img alt="cover image" src={song.album?.cover_image || ''}/>
                          <p className="text-sm">{song.title}</p>
                    </div>
                      ))
                    : "NO HAY NINGUN FAVORITO"}
            </div>

        </Authenticated>
    );
}
