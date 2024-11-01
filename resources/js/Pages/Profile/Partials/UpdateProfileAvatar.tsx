import ImageSelector from "@/Components/ImageSelector";
import { usePage } from "@inertiajs/react";

export default function UpdateProfileAvatar({className}:{className? : string}){



    return (
        <section className={className}>
                <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Avatar
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Update your account's avatar.
                </p>
            </header>
            <ImageSelector />
        </section>

    );
}