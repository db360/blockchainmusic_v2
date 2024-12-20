import { Album, Like, Song } from "@/types";
import { Link } from "@inertiajs/react";



export default function LikeButtonLink({
    album,
    song,
    userLikes,
    type,
}: {
    album: Album | null;
    song: Song | null;
    type: string;
    userLikes: Like[]

}) {

     // Obtener el ID correcto según si es album o song
     const itemId = album?.id || song?.id;
    // Función para verificar si un álbum tiene like
        const isLiked = (itemId: number) => {
            return userLikes.some(
                like =>
                    like.favoritable_id === itemId &&
                    like.favoritable_type === (type === "album" ? "Album" : "Song")
            );
    };
    return (
        <Link
            href={`/${type}/${itemId}/favorite`}
            method="post"
            title="like"
            as="button"
            className={`hover:scale-110 dark:text-white ${
                type === "album"
                    ? "opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100"
                    : "opacity-100"
            } transition`}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill={isLiked(itemId || 0) ? "red" : "currentColor"}
                className={`bi bi-heart${isLiked(itemId || 0) ? "-fill" : ""}`}
                viewBox="0 0 16 16"
            >
                {isLiked(itemId || 0) ? (
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
        </Link>
    );
}
