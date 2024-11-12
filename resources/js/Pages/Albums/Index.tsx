import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Album} from "@/types";
import { usePage } from "@inertiajs/react";
import ExplorerLayout from "../Explorer/ExplorerLayout";

export default function Index() {
    const { albums, user } = usePage().props;

    let albumsData:Album[] = albums?.data;



    return (
        <Authenticated
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    {'Explorer'}
                </h2>
            }
        >
            <div>
                <div className="py-12">
                       <ExplorerLayout albums={albumsData} />
                </div>
            </div>
        </Authenticated>
    );
}
