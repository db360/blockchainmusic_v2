import StatusIcon from "@/Components/historial/StatusIcon";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PurchaseWithItems } from "@/types";
import { router } from "@inertiajs/react";

// TODO: TIPADO CORRECTO DE LOS OBJETOS ALBUMS Y SONGS CON PURCHASEABLE

export default function UserPurchases({
    purchases,
}: {
    purchases: PurchaseWithItems[];
}) {
    console.log(purchases);

    const handleRowClick = (purchaseId: string) => {
        const url = route('purchases.detail', { id: purchaseId }); // Genera la URL con Ziggy
        router.visit(url); // Redirige con Inertia.js
    }
    console.log(purchases);
    return (
        <Authenticated
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    USER PURCHASES
                </h2>
            }
        >
            <div className="relative overflow-x-auto">
                {purchases.length > 0 ? (
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Date
                                </th>
                                <th scope="col" className="px-6 py-3 w-5">
                                    Transaction ID
                                </th>
                                <th scope="col" className="px-6 py-3 w-5">
                                    ID
                                </th>

                                <th scope="col" className="px-6 py-3">
                                    Payment Method
                                </th>

                                <th>Items</th>

                                <th scope="col" className="px-6 py-3">
                                    Total
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {purchases.map((purchase, index) => {
                                // Convertir la fecha
                                const formattedDate = new Date(
                                    purchase.created_at
                                ).toLocaleDateString("es-ES", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    second: "2-digit",
                                });

                                return (
                                    <tr
                                        onClick={() => handleRowClick(purchase.id)}
                                        key={index}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:cursor-pointer hover:opacity-90"
                                    >
                                        <td className="px-6 py-4">
                                            {formattedDate}
                                        </td>
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {purchase.transaction_id}
                                        </th>
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white truncate"
                                        >
                                            {purchase.id}
                                        </th>

                                        <td className="px-6 py-4">
                                            {purchase.payment_method}
                                        </td>
                                        <td>
                                            {purchase.items.map(
                                                (item, index) => (
                                                    <div key={item.id}>
                                                        {item.purchaseable
                                                            .title +
                                                            " - " +
                                                            item.purchaseable_type.replace(
                                                                "App\\Models\\",
                                                                ""
                                                            )}{" "}
                                                        - ${item.item_price}
                                                    </div>
                                                )
                                            )}
                                        </td>

                                        <td className="px-6 py-4">
                                            {purchase.total}€
                                        </td>
                                        <td className="px-6 py-4">
                                            <StatusIcon
                                                status={purchase.status}
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                ) : (
                    <h1 className="mt-4 text-center text-black dark:text-gray-300">
                        There's no sales
                    </h1>
                )}
            </div>
        </Authenticated>
    );
}
