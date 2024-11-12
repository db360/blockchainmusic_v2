import Authenticated from "@/Layouts/AuthenticatedLayout";
import { usePage } from "@inertiajs/react";

export default function UserAlbums() {
    const {role} = usePage().props;

    return (    <Authenticated
        header={
            <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                {'USER ALBUMS' }
            </h2>
        }
    >
        <h1 className="text-white">USER ALBUMS {role}</h1>
        </Authenticated>

        )
}