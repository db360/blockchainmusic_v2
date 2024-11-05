import {Album} from "@/types";
import { Link } from "@inertiajs/react";

export default function AlbumsCard({albums}:{albums: Album[]}) {
    console.log(albums)
    return (
        albums && albums.length > 0 ? (
            albums.map((album) => (
                <div
                    key={album.id}
                    className="cursor-pointer group relative flex flex-col dark:bg-gray-600 bg-white shadow-sm border border-gray-400 w-64 hover:shadow-lg transition-shadow duration-300"
                >
                                 <Link
                                 href=""
                            // href={route(
                            //     "dashboard.showAlbum",
                            //     album.id
                            // )}
                            key={album.id}
                            className="py-1 px-1 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-800 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                        >
                    <div className="relative h-40 overflow-hidden text-white">
                        <img
                            className="-translate-y-8 transition-transform duration-500 ease-[cubic-bezier(0.25, 1, 0.5, 1)] transform group-hover:scale-150"
                            src={album.cover_image ? album.cover_image : 'ruta/a/imagen/predeterminada.jpg'}
                            alt="investment-seed-round"
                        />
                    </div>
                    <div className="py-1 flex flex-col text-left ">

                        <h6 className=" dark:text-white text-xl font-semibold h-10 truncate">
                            {album.title}
                        </h6>

                        <p className="dark:text-gray-300 leading-normal font-light truncate h-">
                            {album.user.name}
                        </p>
                    </div>

                        </Link>
                </div>
            ))
        ) : (
            <p>No albums found.</p>
        )
    )
}