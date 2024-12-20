import AlbumsCard from "@/Components/Albums/AlbumCards";
import { Album, Like } from "@/types";

interface Props {
    albums: Album[];
    userLikes: Like[]; // Array de IDs de álbumes que le gustan al usuario
}

export default function ExplorerLayout({ albums, userLikes }: Props) {

    return (
            <section className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-3 px-5">


                <AlbumsCard albums={albums} userLikes={userLikes}/>
            </section>
    );
}
