import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Album, Like} from "@/types";
import { usePage } from "@inertiajs/react";
import ExplorerLayout from "../Explorer/ExplorerLayout";

export default function Index() {
    const { albums, user, userLikes }:{userLikes: Like[]} = usePage().props;

    let albumsData:Album[] = albums?.data;

    return (
        <Authenticated
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    {'Explorer'}
                </h2>
            }
        >
                <div className="py-12">
                       <ExplorerLayout albums={albumsData} userLikes={userLikes}/>
                </div>
        </Authenticated>
    );
}
