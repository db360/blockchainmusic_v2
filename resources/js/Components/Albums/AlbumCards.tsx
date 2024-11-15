import { useEffect, useState } from "react";
import { Album } from "@/types";
import { Link, router } from "@inertiajs/react";

interface AlbumsCardProps {
    albums: Album[];
    // Añadimos la prop para los likes
    userLikes?: number[]; // Array de IDs de álbumes que el usuario ha dado like
}

export default function AlbumsCard({
    albums,
    userLikes = [],
}: AlbumsCardProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
    const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });


    console.log(userLikes);

    // Función para manejar el like
    const handleLike = (album: Album, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();


        router.visit(`/albums/${album.id}/favorite`, {
            method: 'post',
            onSuccess: () => {
                console.log('Successfully Favorite');
            },
            onError: (errors) => {
                console.error('Error incrementing play count:', errors);
            }
        });
    };

    // Función para verificar si un álbum tiene like
    const isLiked = (albumId: number) => {
        return userLikes.includes(albumId);
    };

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
                                className="w-full md:w-72 block rounded"
                                src={
                                    album.cover_image ?? "image/placeholder.jpg"
                                }
                                alt=""
                            />
                            <div className="absolute bg-black rounded bg-opacity-0 group-hover:bg-opacity-60 w-full h-full top-0 flex items-center group-hover:opacity-100 transition justify-evenly">
                                <button
                                    onClick={(e) => handleLike(album, e)}
                                    title="like"
                                    className={`hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition`}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        fill={
                                            isLiked(album.id)
                                                ? "red"
                                                : "currentColor"
                                        }
                                        className={`bi bi-heart${
                                            isLiked(album.id) ? "-fill" : ""
                                        }`}
                                        viewBox="0 0 16 16"
                                    >
                                        {isLiked(album.id) ? (
                                            // Corazón lleno para cuando tiene like
                                            <path
                                                fillRule="evenodd"
                                                d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                                            />
                                        ) : (
                                            // Corazón vacío para cuando no tiene like
                                            <path d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                                        )}
                                    </svg>
                                </button>
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
                        <div className="px-1 py-2">
                            <Link href={`/album/${album.id}`}>
                                <h3 className="text-white text-lg sm:text-sm line-clamp-1 hover:underline">
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
                </div>
            )}
        </>
    );
}
