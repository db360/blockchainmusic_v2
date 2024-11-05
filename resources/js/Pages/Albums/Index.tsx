import AlbumsCard from "@/Components/Albums/AlbumCards";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Album} from "@/types";
import { usePage } from "@inertiajs/react";

export default function Index() {
    const { albums } = usePage().props;

    let albumsData:Album[] = albums?.data;

    // console.log(albums)
    return (
        <Authenticated
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Albums
                </h2>
            }
        >
            <div>
                <div className="py-12">
                    <div className="mx-auto max-w-8-xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 flex justify-between">
                            <AlbumsCard albums={albumsData} />
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
