import StatusIcon from "@/Components/historial/StatusIcon";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PurchaseDetailAlbum, PurchaseDetailSong } from "@/types";


// TODO: COMPONENTE PARA LAS TABLAS

export default function ArtistSales({ salesAlbums, salesSongs  }: {salesAlbums: PurchaseDetailAlbum[], salesSongs: PurchaseDetailSong[]}) {
    console.log(salesAlbums);
    console.log(salesSongs);
    return (
        <Authenticated
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    {"Artist Sales"}
                </h2>
            }
        >
            <div className="relative overflow-x-auto">
            <h1 className="text-gray-300">ALBUMS</h1>
                {  Object.keys(salesAlbums).length > 0 ? (
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3 w-64">
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
                    {Object.values(salesAlbums).map((album, index) => {
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
                {album.purchaseable.title}
            </th>
            <th
                scope="row"
                className="px-6 py-4 truncate font-medium text-gray-900 whitespace-nowrap dark:text-white line-clamp-1 "
            >
                {album.id}
            </th>
            <td className="px-6 py-4">{album.purchaseable_type}</td>
            <td className="px-6 py-4">
                <img
                    className="w-28"
                    src={album.purchaseable.cover_image ?? ""}
                    alt=""
                />
            </td>
            <td className="px-6 py-4">{formattedDate}</td>
            <td className="px-6 py-4">{album.purchase.payment_method}</td>
            <td className="px-6 py-4">{album.purchaseable.price}€</td>
            <td className="px-6 py-4"> <StatusIcon status={album.purchase.status}/></td>
        </tr>
    );
})}
                    </tbody>
                </table>
                ) : (
                    <h1 className="mt-4 text-center text-black dark:text-gray-300">There's no sales</h1>
                )}

<h1 className="text-gray-300">SONGS</h1>
                { Object.keys(salesSongs).length > 0 ? (
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3 w-64">
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
                    {Object.values(salesSongs).map((song, index) => {
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
                    src={song.purchaseable.album?.cover_image ?? ""}
                    alt=""
                />
            </td>
            <td className="px-6 py-4">{formattedDate}</td>
            <td className="px-6 py-4">{song.purchase.payment_method}</td>
            <td className="px-6 py-4">{song.item_price}€</td>
            <td className="px-6 py-4"> <StatusIcon status={song.purchase.status}/></td>
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
    );
}
