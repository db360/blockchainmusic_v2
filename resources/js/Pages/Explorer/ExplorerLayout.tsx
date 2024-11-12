import AlbumsCard from "@/Components/Albums/AlbumCards";
import { Album } from "@/types";

export default function ExplorerLayout({ albums }: { albums: Album[] }) {
    return (
            <section className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-3 px-5">

                <AlbumsCard albums={albums}/>
            </section>
    );
}
