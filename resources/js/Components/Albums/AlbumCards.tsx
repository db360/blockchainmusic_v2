import { useEffect, useState } from "react";
import { Album, Like } from "@/types";
import { Link } from "@inertiajs/react";
import { useCart } from "react-use-cart";
import LikeButtonLink from "../Favorite/LikeButtonLink";

interface AlbumsCardProps {
    albums: Album[];
    // Añadimos la prop para los likes
    userLikes?: Like[]; // Array de IDs de álbumes que el usuario ha dado like
}

export default function AlbumsCard({
    albums,
    userLikes = [],
}: AlbumsCardProps) {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
    const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });



    const handleMoreClick = (album: Album, event: React.MouseEvent) => {
        event.stopPropagation(); // Prevenir que el click se propague
        const button = event.currentTarget;
        const rect = button.getBoundingClientRect();

        setPopupPosition({
            x: rect.x,
            y: rect.y + rect.height + 5, // 5px de espacio entre el botón y el popup
        });
        setSelectedAlbum(album);
        setIsOpen(true);
    };

    // Cerrar el popup cuando se hace click fuera
    const handleClickOutside = () => {
        setIsOpen(false);
        setSelectedAlbum(null);
    };

    // Añadir event listener para cerrar el popup
    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const { addItem } = useCart();

    return (
        <>
            {albums && albums.length > 0 ? (
                albums.map((album, index) => (

                    <div
                        key={index}
                        className="bg-gray-100 dark:bg-gray-900 shadow-lg rounded px-3"
                    >
                        <div className="group relative">
                            <img
                                className="w-full md:w-72 sm:h-24 object-cover rounded"
                                src={
                                    album.cover_image ?? "image/placeholder.jpg"
                                }
                                alt=""
                            />
                            <div className="absolute bg-black rounded bg-opacity-0 group-hover:bg-opacity-60 w-full h-full top-0 flex items-center group-hover:opacity-100 transition justify-evenly">
                                <LikeButtonLink song={null} album={album} userLikes={userLikes} type="album"/>
                                <button
                                    title="play"
                                    className="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="40"
                                        height="40"
                                        fill="currentColor"
                                        className="bi bi-play-circle-fill"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" />
                                    </svg>
                                </button>
                                <button
                                    onClick={(e) => handleMoreClick(album, e)}
                                    title="more"
                                    className="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        fill="currentColor"
                                        className="bi bi-three-dots"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="px-1 py-2 w-full">
                            <Link href={`/album/${album.id}`}>
                                <h3 className="text-white text-lg sm:text-sm line-clamp-1 sm:line-clamp-2 hover:underline">
                                    {album.title}
                                </h3>
                            </Link>
                            <p className="text-gray-400 sm:text-sm line-clamp-1">
                                {album.user.name}
                            </p>
                        </div>
                    </div>
                ))
            ) : (
                <p>No albums found.</p>
            )}

            {/* Popup simple */}
            {isOpen && selectedAlbum && (
                <div
                    style={{
                        position: "fixed",
                        left: `${popupPosition.x}px`,
                        top: `${popupPosition.y}px`,
                        zIndex: 50,
                    }}
                    onClick={(e) => e.stopPropagation()} // Prevenir que el click en el popup lo cierre
                    className="fixed bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2"
                >
                    <Link
                        href={`/album/${selectedAlbum.id}`}
                        className="whitespace-nowrap px-3 py-1 text-black dark:text-gray-300 rounded-md hover:bg-blue-600 transition block text-center"
                    >
                        Ver Album
                    </Link>
                    <Link
                        href={`/album/${selectedAlbum.id}`}
                        className="whitespace-nowrap px-3 py-1 text-black dark:text-gray-300 rounded-md hover:bg-blue-600 transition block text-center"
                    >
                        Añadir a Playlist
                    </Link>
                    <button
                          onClick={() => {
                            addItem(
                                {
                                    id: selectedAlbum.id.toString(),
                                    price: selectedAlbum.price,
                                    type: 'Album',
                                    cover_image: selectedAlbum.cover_image,
                                    name: selectedAlbum.title,
                                },
                                1
                            );
                            setIsOpen(false);
                        }}
                        className="whitespace-nowrap px-3 py-1 text-black dark:text-gray-300 rounded-md hover:bg-blue-600 transition block text-center"
                    >
                        Añadir al Carrito
                    </button>
                </div>
            )}
        </>
    );
}
