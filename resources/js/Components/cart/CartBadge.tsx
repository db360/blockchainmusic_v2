import { Link } from "@inertiajs/react";
import { TbShoppingCart } from "react-icons/tb";
import { useCart } from "react-use-cart";

export default function CartBadge() {


    const {isEmpty, totalItems} = useCart();



    return (
        <div className="hover:cursor-pointer">
        <Link href="/cart">
            <strong className="relative inline-flex items-cente px-2.5 py-1.5 text-xs font-medium">
                <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-1 -end-2 dark:border-gray-900">
                    {isEmpty ? 0 : totalItems }
                </div>
                <TbShoppingCart className="hover:text-gray-300 text-center text-gray-400 text-2xl" />
            </strong>
        </Link>
        </div>
    );
}
