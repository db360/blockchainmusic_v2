import Authenticated from "@/Layouts/AuthenticatedLayout";

export default function Checkout() {
    return (
        <Authenticated
        header={
            <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                Checkout
            </h2>
        }
        >
            <h1 className="text-white">CHECKOUT</h1>
        </Authenticated>
    )
}