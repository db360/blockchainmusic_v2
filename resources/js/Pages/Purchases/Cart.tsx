import CartCard from "@/Components/cart/CartCard";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link, router } from "@inertiajs/react";
import { Item, useCart } from "react-use-cart";

export default function Cart() {
    const { isEmpty, items, cartTotal } = useCart();


    //TODO: CHECK USER IN THE CART, IF IT's NOT THE SAME USER, DELETE CART ITEMS
    console.log(items);

    const cartItemsString = localStorage.getItem('react-use-cart');
        let cartItems: Item[] = [];

        if (cartItemsString) {
            try {
                const parsedCart = JSON.parse(cartItemsString);
                // Si quieres solo los items
                cartItems = parsedCart.items || [];
            } catch (error) {
                console.error('Error parsing cart items', error);
                cartItems = [];
            }
        }

    const handleCheckout = (e: React.MouseEvent<HTMLAnchorElement>) => {

        e.preventDefault();


        console.log(cartItems)

        if (cartItems && cartItems.length > 0) {
            router.post('/checkout', {
                items: cartItems,
                total: cartTotal.toFixed(2),
                tax: (cartTotal * 0.05).toFixed(2)
            })
        } else {
            alert('TU CARRITO ESTÁ VACÍO')
        }
    }

    return (
        <Authenticated
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    My Cart
                </h2>
            }
        >
            <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                        Shopping Cart
                    </h2>

                    <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                        <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                            <div className="space-y-6">
                                {isEmpty ? (
                                    <h3 className="text-red-400">Empty Cart</h3>
                                ) : (
                                    items.map((item) => (
                                        <CartCard
                                            key={item.id}
                                            item={item}
                                        />
                                    ))
                                )}
                            </div>

                            {/* <div class="hidden xl:mt-8 xl:block">
                                <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">
                                    People also bought
                                </h3>
                                <div class="mt-6 grid grid-cols-3 gap-4 sm:mt-8">
                                    <div class="space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                                        <a
                                            href="#"
                                            class="overflow-hidden rounded"
                                        >
                                            <img
                                                class="mx-auto h-44 w-44 dark:hidden"
                                                src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
                                                alt="imac image"
                                            />
                                            <img
                                                class="mx-auto hidden h-44 w-44 dark:block"
                                                src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg"
                                                alt="imac image"
                                            />
                                        </a>
                                        <div>
                                            <a
                                                href="#"
                                                class="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
                                            >
                                                iMac 27”
                                            </a>
                                            <p class="mt-2 text-base font-normal text-gray-500 dark:text-gray-400">
                                                This generation has some
                                                improvements, including a longer
                                                continuous battery life.
                                            </p>
                                        </div>
                                        <div>
                                            <p class="text-lg font-bold text-gray-900 dark:text-white">
                                                <span class="line-through">
                                                    {" "}
                                                    $399,99{" "}
                                                </span>
                                            </p>
                                            <p class="text-lg font-bold leading-tight text-red-600 dark:text-red-500">
                                                $299
                                            </p>
                                        </div>
                                        <div class="mt-6 flex items-center gap-2.5">
                                            <button
                                                data-tooltip-target="favourites-tooltip-1"
                                                type="button"
                                                class="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                                            >
                                                <svg
                                                    class="h-5 w-5"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"
                                                    ></path>
                                                </svg>
                                            </button>
                                            <div
                                                id="favourites-tooltip-1"
                                                role="tooltip"
                                                class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
                                            >
                                                Add to favourites
                                                <div
                                                    class="tooltip-arrow"
                                                    data-popper-arrow
                                                ></div>
                                            </div>
                                            <button
                                                type="button"
                                                class="inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium  text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                            >
                                                <svg
                                                    class="-ms-2 me-2 h-5 w-5"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4"
                                                    />
                                                </svg>
                                                Add to cart
                                            </button>
                                        </div>
                                    </div>
                                    <div class="space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                                        <a
                                            href="#"
                                            class="overflow-hidden rounded"
                                        >
                                            <img
                                                class="mx-auto h-44 w-44 dark:hidden"
                                                src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/ps5-light.svg"
                                                alt="imac image"
                                            />
                                            <img
                                                class="mx-auto hidden h-44 w-44 dark:block"
                                                src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/ps5-dark.svg"
                                                alt="imac image"
                                            />
                                        </a>
                                        <div>
                                            <a
                                                href="#"
                                                class="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
                                            >
                                                Playstation 5
                                            </a>
                                            <p class="mt-2 text-base font-normal text-gray-500 dark:text-gray-400">
                                                This generation has some
                                                improvements, including a longer
                                                continuous battery life.
                                            </p>
                                        </div>
                                        <div>
                                            <p class="text-lg font-bold text-gray-900 dark:text-white">
                                                <span class="line-through">
                                                    {" "}
                                                    $799,99{" "}
                                                </span>
                                            </p>
                                            <p class="text-lg font-bold leading-tight text-red-600 dark:text-red-500">
                                                $499
                                            </p>
                                        </div>
                                        <div class="mt-6 flex items-center gap-2.5">
                                            <button
                                                data-tooltip-target="favourites-tooltip-2"
                                                type="button"
                                                class="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                                            >
                                                <svg
                                                    class="h-5 w-5"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"
                                                    ></path>
                                                </svg>
                                            </button>
                                            <div
                                                id="favourites-tooltip-2"
                                                role="tooltip"
                                                class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
                                            >
                                                Add to favourites
                                                <div
                                                    class="tooltip-arrow"
                                                    data-popper-arrow
                                                ></div>
                                            </div>
                                            <button
                                                type="button"
                                                class="inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium  text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                            >
                                                <svg
                                                    class="-ms-2 me-2 h-5 w-5"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4"
                                                    />
                                                </svg>
                                                Add to cart
                                            </button>
                                        </div>
                                    </div>
                                    <div class="space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                                        <a
                                            href="#"
                                            class="overflow-hidden rounded"
                                        >
                                            <img
                                                class="mx-auto h-44 w-44 dark:hidden"
                                                src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-light.svg"
                                                alt="imac image"
                                            />
                                            <img
                                                class="mx-auto hidden h-44 w-44 dark:block"
                                                src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-dark.svg"
                                                alt="imac image"
                                            />
                                        </a>
                                        <div>
                                            <a
                                                href="#"
                                                class="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
                                            >
                                                Apple Watch Series 8
                                            </a>
                                            <p class="mt-2 text-base font-normal text-gray-500 dark:text-gray-400">
                                                This generation has some
                                                improvements, including a longer
                                                continuous battery life.
                                            </p>
                                        </div>
                                        <div>
                                            <p class="text-lg font-bold text-gray-900 dark:text-white">
                                                <span class="line-through">
                                                    {" "}
                                                    $1799,99{" "}
                                                </span>
                                            </p>
                                            <p class="text-lg font-bold leading-tight text-red-600 dark:text-red-500">
                                                $1199
                                            </p>
                                        </div>
                                        <div class="mt-6 flex items-center gap-2.5">
                                            <button
                                                data-tooltip-target="favourites-tooltip-3"
                                                type="button"
                                                class="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                                            >
                                                <svg
                                                    class="h-5 w-5"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"
                                                    ></path>
                                                </svg>
                                            </button>
                                            <div
                                                id="favourites-tooltip-3"
                                                role="tooltip"
                                                class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
                                            >
                                                Add to favourites
                                                <div
                                                    class="tooltip-arrow"
                                                    data-popper-arrow
                                                ></div>
                                            </div>

                                            <button
                                                type="button"
                                                class="inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium  text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                            >
                                                <svg
                                                    class="-ms-2 me-2 h-5 w-5"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4"
                                                    />
                                                </svg>
                                                Add to cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>

                        <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Order summary
                                </p>

                                <div className="space-y-4">
                                    <div className="space-y-2">

                                        {/* <dl className="flex items-center justify-between gap-4">
                                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                                                Savings
                                            </dt>
                                            <dd className="text-base font-medium text-green-600">
                                                -$299.00
                                            </dd>
                                        </dl> */}

                                        <dl className="flex items-center justify-between gap-4">
                                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                                                Tax
                                            </dt>
                                            <dd className="text-base font-medium text-gray-900 dark:text-white">
                                                { (cartTotal * 0.05).toFixed(2)}
                                            </dd>
                                        </dl>
                                    </div>

                                    <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                                        <dt className="text-base font-bold text-gray-900 dark:text-white">
                                            Total
                                        </dt>
                                        <dd className="text-base font-bold text-gray-900 dark:text-white">
                                            {cartTotal.toFixed(2)} €
                                        </dd>
                                    </dl>
                                </div>

                                <Link
                                    href="#"
                                    onClick={handleCheckout}
                                    className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    Proceed to Checkout
                                </Link>

                                <div className="flex items-center justify-center gap-2">
                                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                        {" "}
                                        or{" "}
                                    </span>
                                    <Link
                                        href="/explore"
                                        title="Explorer"
                                        className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
                                    >
                                        Continue Shopping
                                        <svg
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M19 12H5m14 0-4 4m4-4-4-4"
                                            />
                                        </svg>
                                    </Link>
                                </div>
                            </div>

                            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                                <form className="space-y-4">
                                    <div>
                                        <label
                                            htmlFor="voucher"
                                            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            {" "}
                                            Do you have a voucher or gift card?{" "}
                                        </label>
                                        <input
                                            type="text"
                                            id="voucher"
                                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                                            placeholder=""
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                    >
                                        Apply Code
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Authenticated>
    );
}
