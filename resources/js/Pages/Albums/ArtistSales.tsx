import Authenticated from "@/Layouts/AuthenticatedLayout";


export default function ArtistSales() {
    return (
        <Authenticated
        header={
            <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                {'Artist Sales'}
            </h2>
        }
    >
        <h1 className="text-white">ARTIST SALES</h1>
        </Authenticated>
    )
}