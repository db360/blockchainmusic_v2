import {useForm } from "@inertiajs/react";
import { FormEventHandler, useState } from "react";
import InputError from "./InputError";
import PrimaryButton from "./PrimaryButton";
import { Transition } from "@headlessui/react";


export default function ImageSelector() {

    const [imagePreview, setImagePreview] = useState<string | null>(null); // Estado para manejar la previsualización de la imagen
    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
        clearErrors,
        recentlySuccessful,
    } = useForm({
        avatar: null as File | null,
    });



    // Método para manejar el cambio de imagen
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || !e.target.files[0]) return; // Add null check

        const selectedImage = e.target.files[0];

            // POR QUE NO LO AGREGA CON setData?
            setData("avatar", selectedImage);

            setImagePreview(URL.createObjectURL(selectedImage)); // Previsualiza la imagen
            clearErrors("avatar"); // Resetea el título actual
    };
    // Método para eliminar la imagen seleccionada
    const handleRemoveImage = () => {
        setData("avatar", null);
        setImagePreview(null); // Remover la previsualización
        clearErrors('avatar');
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        console.log(data);

        post(route('avatar.update'), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                reset('avatar');
                setImagePreview(null);
            },
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-6"
        >
            <div className="flex justify-center">
                {imagePreview ? (
                    <div className="flex items-center justify-center w-3/4 h-64 rounded-lg transition-all duration-500 ease-in-out transform opacity-100">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="rounded-full h-64 w-64 object-cover"
                        />
                        <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                        >
                            Eliminar
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center justify-center p-4 w-3/4 h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer  dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
                        <label
                            htmlFor="avatar"
                            className="flex flex-col items-center justify-center w-full h-full cursor-pointer dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
                        >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg
                                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 16"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5A5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                    />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="font-semibold">
                                        Click to upload
                                    </span>{" "}
                                    or drag and drop
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    PNG, JPG (MAX. 800x400px)
                                </p>
                            </div>
                            <input
                                id="avatar"
                                name="avatar"
                                type="file"
                                accept="image/png, image/jpeg"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </label>
                    </div>
                )}
                <InputError
                    message={errors.avatar}
                    className="text-center mt-2"
                />
            </div>
            <div className="flex items-center gap-4">
                <PrimaryButton disabled={processing || !data.avatar}>{processing ? 'Uploading...' : 'Save'}</PrimaryButton>

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
    );
}
