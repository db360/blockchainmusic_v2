import StatusIcon from "@/Components/historial/StatusIcon";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {AlbumWithRelations, Purchase, SongWithRelations} from "@/types";

// TODO: TIPADO CORRECTO DE LOS OBJETOS ALBUMS Y SONGS CON PURCHASEABLE

export default function UserPurchases({purchasedAlbums, purchasedSongs}: {purchasedAlbums: AlbumWithRelations, purchasedSongs: SongWithRelations}) {

    return(
        <Authenticated
        header={
            <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                USER PURCHASES
            </h2>
        }
    >

<div className="relative overflow-x-auto">
        <h1 className="text-gray-300">ALBUMS</h1>
                {  Object.keys(purchasedAlbums).length > 0 ? (
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3 w-5">
                                File
                            </th>
                            <th scope="col" className="px-6 py-3 w-5">
                                Transaction ID
                            </th>
                            <th  scope="col" className="px-6 py-3">
                                Type
                            </th>

                            <th scope="col" className="px-6 py-3">
                                Album
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Fecha
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Método de Pago
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {Object.values(purchasedAlbums).map((album, index) => {
                        const typedAlbum =  album as Purchase;
    // Convertir la fecha
    const formattedDate = new Date(album.created_at).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    return (
        <tr
            key={index}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        >
            <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
                {typedAlbum.purchaseable.title}
            </th>
            <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white truncate"
            >
                {typedAlbum.id}
            </th>
            <td className="px-6 py-4">{typedAlbum.purchaseable_type}</td>
            <td className="px-6 py-4">
                <img
                    className="w-28"
                    src={typedAlbum.purchaseable.cover_image ?? ""}
                    alt=""
                />
            </td>
            <td className="px-6 py-4">{formattedDate}</td>
            <td className="px-6 py-4">{typedAlbum.payment_method}</td>
            <td className="px-6 py-4">{typedAlbum.amount}€</td>
            <td className="px-6 py-4"> <StatusIcon status={typedAlbum.status}/></td>
        </tr>
    );
})}
                    </tbody>
                </table>
                ) : (
                    <h1 className="mt-4 text-center text-black dark:text-gray-300">There's no sales</h1>
                )}

<h1 className="text-gray-300">SONGS</h1>
                { Object.keys(purchasedSongs).length > 0 ? (
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3 w-5">
                                File
                            </th>
                            <th scope="col" className="px-6 py-3 w-5">
                                Transaction ID
                            </th>
                            <th  scope="col" className="px-6 py-3">
                                Type
                            </th>

                            <th scope="col" className="px-6 py-3">
                                Album
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Fecha
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Método de Pago
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {Object.values(purchasedSongs).map((song, index) => {
    // Convertir la fecha
    const formattedDate = new Date(song.created_at).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    return (
        <tr
            key={index}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        >
            <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
                {song.purchaseable.title}
            </th>
            <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white truncate"
            >
                {song.id}
            </th>
            <td className="px-6 py-4">{song.purchaseable_type}</td>
            <td className="px-6 py-4">
                <img
                    className="w-28"
                    src={song.purchaseable.album.cover_image ?? ""}
                    alt=""
                />
            </td>
            <td className="px-6 py-4">{formattedDate}</td>
            <td className="px-6 py-4">{song.payment_method}</td>
            <td className="px-6 py-4">{song.amount}€</td>
            <td className="px-6 py-4"> <StatusIcon status={song.status}/></td>
        </tr>
    );
})}
                    </tbody>
                </table>
                ) : (
                    <h1 className="mt-4 text-center text-black dark:text-gray-300">There's no sales</h1>
                )}
            </div>


        </Authenticated>
    )
}