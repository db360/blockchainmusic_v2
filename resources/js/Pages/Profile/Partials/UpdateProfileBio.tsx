import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextAreaInput from "@/Components/TextAreaInput";
import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect } from "react";

export default function UpdateProfileBio({
    className,
}: {
    className?: string;
}) {
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        bio: "",
    });

    const updateBio: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('bio.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                console.log(errors);
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Bio Information
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Update your account's biography information.
                </p>
            </header>
            <form  onSubmit={updateBio} >
                <TextAreaInput
                    id="bio"
                    rows={4}
                    className="mt-4 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write your biography here..."
                    value={data.bio}
                    onChange={(e) => setData("bio", e.target.value)}
                />
                <InputError message={errors.bio} className="mt-2" />

                <div className="flex items-center gap-4">
                    <PrimaryButton className="mt-4" disabled={processing}>
                        Save
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Saved.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
