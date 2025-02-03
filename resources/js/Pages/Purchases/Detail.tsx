import Authenticated from "@/Layouts/AuthenticatedLayout";
import { usePage } from "@inertiajs/react";


//TODO: CREAR COMPONENTE PARA EL INVOICE DE LA COMPRA
//TODO: MOSTRAR BIEN LOS ITEMS

export default function Detail() {
    const { purchaseDetail } = usePage().props;
    console.log(purchaseDetail);

    if (!purchaseDetail || !purchaseDetail.items) {
        return <p>No hay detalles de compra disponibles.</p>;
    }

    return (
        <Authenticated
        header={
            <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                PURCHASE DETAILS
            </h2>
        }
        >
            <div className="mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                {/* Información general de la compra */}
                <div className="mb-6">
                    <div className="space-y-2">
                        <p className="text-gray-600 dark:text-gray-400">
                            <span className="font-medium">
                                ID de la Compra:
                            </span>{" "}
                            {purchaseDetail.id}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                            <span className="font-medium">
                                ID de Transacción:
                            </span>{" "}
                            {purchaseDetail.transaction_id}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                            <span className="font-medium">Total:</span> $
                            {purchaseDetail.total}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                            <span className="font-medium">Estado:</span>{" "}
                            {purchaseDetail.status}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                            <span className="font-medium">Método de Pago:</span>{" "}
                            {purchaseDetail.payment_method}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                            <span className="font-medium">Fecha:</span>{" "}
                            {new Date(
                                purchaseDetail.created_at
                            ).toLocaleDateString()}
                        </p>
                    </div>
                </div>

                {/* Lista de ítems comprados */}
                <div>
                    <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
                        Ítems Comprados
                    </h3>
                    <div className="space-y-4">
                        {purchaseDetail.items.map((item) => (
                            <div
                                key={item.id}
                                className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm"
                            >
                                <p className="text-gray-600 dark:text-gray-400">
                                    <span className="font-medium">Tipo:</span>{" "}
                                    {item.purchaseable_type.replace(
                                        "App\\Models\\",
                                        ""
                                    )}
                                </p>
                                <p className="text-gray-600 dark:text-gray-400">
                                    <span className="font-medium">
                                        ID del Ítem:
                                    </span>{" "}
                                    {item.purchaseable_id}
                                </p>
                                <p className="text-gray-600 dark:text-gray-400">
                                    <span className="font-medium">Precio:</span>{" "}
                                    ${item.item_price}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
