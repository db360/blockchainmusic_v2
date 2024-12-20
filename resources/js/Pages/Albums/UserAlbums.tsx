import UserAlbumCards from "@/Components/Albums/UserAlbumCards";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { usePage } from "@inertiajs/react";

export default function UserAlbums() {
    const { role, albums, songs } = usePage().props

    console.log('SONGS: ', songs)
    console.log('ALBUMS: ', albums)



    return (
        <Authenticated
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    <span className="uppercase">{role}</span>
                    {" ALBUMS"}
                </h2>
            }
        >
            <section className="w-full grid grid-cols-1 gap-3 px-5">
                <UserAlbumCards albums={albums} />
            </section>
        </Authenticated>
    );
}
