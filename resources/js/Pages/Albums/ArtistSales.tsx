import StatusIcon from "@/Components/historial/statusIcon";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Sales } from "@/types";

export default function ArtistSales({ sales }: { sales: Sales }) {
    console.log(sales);
    return (
        <Authenticated
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    {"Artist Sales"}
                </h2>
            }
        >
            <div className="relative overflow-x-auto">
                { sales.length > 0 ? (
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Transaction ID
                            </th>

                            <th scope="col" className="px-6 py-3">
                                Album
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Fecha
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Categoria
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
                        {sales.map((sale, index) => (
                            <tr
                                key={index}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                            >
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    {sale.id}
                                </th>
                                <td className="px-6 py-4">
                                    <img
                                        className="w-28"
                                        src={
                                            sale.purchaseable.album.cover_image
                                        }
                                        alt=""
                                    />
                                    <p>{sale.purchaseable.album.title}</p>
                                    <p>{sale.purchaseable.album.user.name}</p>
                                </td>
                                <td className="px-6 py-4">{sale.created_at}</td>
                                <td className="px-6 py-4">
                                    {sale.purchaseable_type}
                                </td>
                                <td className="px-6 py-4">{sale.amount}€</td>
                                <td className="px-6 py-4">
                                    <StatusIcon status={sale.status}/>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                ) : (
                    <h1 className="mt-4 text-center text-black dark:text-gray-300">There's no sales</h1>
                )}

            </div>
        </Authenticated>
    );
}
