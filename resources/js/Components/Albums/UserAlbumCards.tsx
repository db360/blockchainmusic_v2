import { Album } from "@/types";
import TimeAgo from 'react-timeago';

export default function UserAlbumCards({ albums }: { albums: Album[] | null}) {


    return albums && albums.length > 0 ? (
        albums.map((album, index) => (
            <div key={index} className=" flex h-full md:h-36 flex-col md:flex-row bg-white border rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
                <div className="shrink-0 relative w-full rounded-t-xl md:rounded-t-none pt-28 rounded-l-none md:rounded-l-lg md:max-w-xs">
                    <img
                        className="h-40 md:h-36 w-full absolute top-0 start-0 object-cover"
                        src={album.cover_image ?? '/ruta/placeholder.jpg'}
                        alt="Card Image"
                    />
                </div>
                <div className="flex flex-wrap h-40 md:h-36">
                    <div className="p-4 flex flex-col">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                            {album.title}
                        </h3>
                        <p className="mt-1 text-gray-500 dark:text-neutral-400">
                            {album.description}
                        </p>
                        <div className="mt-auto">
                            <p className="text-xs text-gray-500 dark:text-neutral-500">
                                <TimeAgo date={album.release_date}/>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        ))
    ) : (
        <p>No albums found.</p>
    );
}
