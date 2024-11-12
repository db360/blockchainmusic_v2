import Authenticated from "@/Layouts/AuthenticatedLayout";

export default function UserPurchases() {
    return(
        <Authenticated
        header={
            <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                USER PURCHASES
            </h2>
        }
    >
        <h1 className="text-white">USER PURCHASES</h1>
        </Authenticated>
    )
}