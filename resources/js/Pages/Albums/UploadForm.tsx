import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { MdOutlineDeleteForever } from "react-icons/md";

import genres from "../../../data/genres.json";

console.log(genres);

interface FormInterface {
    album_title: string;
    files: File[];
    titles: string[];
    image: File | null;
    description?: string;
    album_price: string;
    song_price: string[];
    genre: string;
    subgenre: string;
}

export default function UploadForm() {
    const { data, setData, post, processing, errors, progress, setError } =
        useForm<FormInterface>({
            album_title: "",
            files: [],
            titles: [],
            image: null,
            description: "",
            album_price: "0.00",
            song_price: [],
            genre: "",
            subgenre: "",
        });

    const [currentTitle, setCurrentTitle] = useState<string>("");
    const [currentDescription, setCurrentDescription] = useState<string>("");
    const [currentAlbumPrice, setCurrentAlbumPrice] = useState<string>("0.00");
    const [currentSongPrice, setCurrentSongPrice] = useState<string>("0.00");
    const [currentAlbumTitle, setCurrentAlbumTitle] = useState<string>("");
    const [imagePreview, setImagePreview] = useState<string | null>(null); // Estado para manejar la previsualización de la imagen

    const [selectedGenre, setSelectedGenre] = useState<string>("");
    const [selectedSubGenre, setSelectedSubGenre] = useState<string>("");

    const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const genre = e.target.value;
        setSelectedGenre(genre);
        setSelectedSubGenre(""); // Reset subgénero cuando cambia el género
        setData('genre', genre);
    };

    const handleSubGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const subGenre = e.target.value;
        setSelectedSubGenre(subGenre);
        setData('subgenre', subGenre);
    };

    // Método para manejar el cambio de archivos de audio
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || []); // Convierte FileList en array

        // Solo permite agregar archivos si el título está lleno
        if (currentTitle.trim() === "") {
            setError(
                "files",
                "Por favor, ingrese un título antes de agregar un archivo."
            );
            return;
        }

        // Solo permite agregar archivos si el título está lleno
        if (data.files.length > 10) {
            alert("Máximo 10 canciones");
            return;
        }

        // Asegúrate de que los archivos existan antes de agregarlos al estado
        if (selectedFiles.length > 0) {
            setData((prevData) => ({
                ...prevData,
                files: [...prevData.files, ...selectedFiles], // Crea un nuevo array con los archivos anteriores y los nuevos
                titles: [...prevData.titles, currentTitle], // Agrega el título correspondiente
                song_price: [
                    ...prevData.song_price,
                    currentSongPrice || "0.00",
                ],
            }));

            e.target.value = ""; // Limpia el input de archivos
            setCurrentTitle("");
            setCurrentSongPrice("0.00");

            console.log("Archivos agregados:", [
                ...data.files,
                ...selectedFiles,
            ]);
        } else {
            alert("No se seleccionó ningún archivo.");
        }

        setError("files", "");
    };

    const handleAlbumTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError("album_title", ""); // Resetea el título actual
        setCurrentAlbumTitle(e.target.value); // Actualizar el título del archivo actual
    };

    // Método para manejar el cambio de títulos de canciones
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError("album_title", ""); // Resetea el título actual
        setCurrentTitle(e.target.value); // Actualizar el título del archivo actual

        setData({
            ...data,
            album_title: currentAlbumTitle,
        });
    };
    // Método para manejar el cambio del precio de la canción
    const handleSongPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        // Solo permite números y punto decimal
        if (value === "" || /^\d*\.?\d{0,2}$/.test(value)) {
            setCurrentSongPrice(value);
        }
    };

    const handleDescriptionChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setError("description", ""); // Resetea el título actual
        setCurrentDescription(e.target.value); // Actualizar el título del archivo actual
        setData("description", e.target.value);
        console.log(currentDescription);
    };
    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError("album_price", ""); // Resetea el título actual
        const value = e.target.value;
        // Solo permite números y punto decimal
        if (value === "" || /^\d*\.?\d{0,2}$/.test(value)) {
            setCurrentAlbumPrice(value);
            setData("album_price", value === "" ? "0" : value);
        }
    };

    // Método para manejar el cambio de imagen
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return; // Add null check
        const selectedImage: File | null = e.target.files[0];

        if (selectedImage) {
            setData("image", selectedImage);
            setImagePreview(URL.createObjectURL(selectedImage)); // Previsualiza la imagen
            setError("image", ""); // Resetea el título actual
        }
    };

    // Método para eliminar la imagen seleccionada
    const handleRemoveImage = () => {
        setData("image", null);
        setImagePreview(null); // Remover la previsualización
    };

    // Método para eliminar una canción (archivo + título)
    const handleRemoveFile = (index: number) => {
        const newFiles = data.files.filter((_, i) => i !== index);
        const newTitles = data.titles.filter((_, i) => i !== index);
        const newSongPrices = data.song_price.filter((_, i) => i !== index);

        // Actualiza el estado usando setData
        setData({
            ...data,
            files: newFiles,
            titles: newTitles,
            song_price: newSongPrices,
        });

        console.log(data);
    };
    // Método para enviar el formulario
    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();

        const formData = {
            ...data,
            album_title: currentAlbumTitle,
            description: currentDescription,
            price: parseFloat(currentAlbumPrice) || 0,
            genre: selectedGenre,
            subgenre: selectedSubGenre
        };

        post(route("albums.upload"), {
            forceFormData: true,
            data: formData,
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="p-4 w-10/12 m-auto"
        >
            <div className="w-full">
                <InputLabel htmlFor="album_title" value="Título del album" />
                <TextInput
                    className="mt-1 block w-full"
                    id="album_title"
                    name="album_title"
                    type="text"
                    value={currentAlbumTitle}
                    onChange={handleAlbumTitleChange}
                    isFocused={true}
                />
                <InputError message={errors.album_title} className="mt-2" />
            </div>

            <div className="flex mt-2">
                <div className="w-full h-80">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 ">
                        Imagen
                    </p>
                    {imagePreview ? (
                        <div className="relative mt-2 transition-all duration-500 ease-in-out transform opacity-100 translate-y-0">
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="h-72 m-auto"
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
                        <div className="flex items-center justify-center p-4 w-3/4 m-auto translate-y-0 cursor-pointer ">
                            <label
                                htmlFor="image"
                                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg dark:border-gray-600 hover:cursor-pointer "
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
                                    id="image"
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </label>
                        </div>
                    )}
                    <InputError
                        message={errors.image}
                        className="text-center mt-2"
                    />
                </div>
            </div>

            <div className="mt-2">
                <InputLabel
                    htmlFor="description"
                    value="Descripción"
                    className="mt-2"
                    children={undefined}
                />
                <TextInput
                    id="description"
                    type="text"
                    name="description"
                    value={currentDescription}
                    className="mt-1 block w-full"
                    autoComplete="description"
                    isFocused={true}
                    onChange={handleDescriptionChange}
                />
                <InputError message={errors.description} className="mt-2" />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-2">
    <div>
        <InputLabel
            htmlFor="genre"
            value="Género"
            className="mt-2"
        />
        <select
            title="genre"
            id="genre"
            name="genre"
            value={selectedGenre}
            onChange={handleGenreChange}
            className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
        >
            <option value="">Selecciona un género</option>
            {Object.keys(genres).map((genre, index) => (
                <option key={index} value={genre}>
                    {genre}
                </option>
            ))}
        </select>
        <InputError message={errors.genre} className="mt-2" />
    </div>

    <div>
        <InputLabel
            htmlFor="subgenre"
            value="Subgénero"
            className="mt-2"
        />
        <select
            title="subgenre"
            id="subgenre"
            name="subgenre"
            value={selectedSubGenre}
            onChange={handleSubGenreChange}
            disabled={!selectedGenre}
            className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
        >
            <option value="">Selecciona un subgénero</option>
            {selectedGenre &&
                genres[selectedGenre as keyof typeof genres].map((subgenre, index) => (
                    <option key={index} value={subgenre}>
                        {subgenre}
                    </option>
                ))}
        </select>
        <InputError message={errors.subgenre} className="mt-2" />
    </div>
</div>
            <div className="mt-2">
                <InputLabel
                    htmlFor="price"
                    value="Precio del Álbum"
                    className="mt-2"
                    children={undefined}
                />
                <TextInput
                    id="price"
                    type="text"
                    name="price"
                    value={currentAlbumPrice}
                    className="mt-1 block w-2/12"
                    autoComplete="price"
                    isFocused={true}
                    onChange={handlePriceChange}
                    onBlur={() => {
                        if (currentAlbumPrice) {
                            const formattedPrice =
                                parseFloat(currentAlbumPrice).toFixed(2);
                            setCurrentAlbumPrice(formattedPrice);
                            setData("album_price", formattedPrice);
                        }
                    }}
                />
                <InputError message={errors.album_price} className="mt-2" />
            </div>
            <div className="mt-2">
                <InputLabel
                    htmlFor="title"
                    value="Título de la canción"
                    className="mt-2"
                    children={undefined}
                />
                <TextInput
                    id="title"
                    type="text"
                    name="title"
                    value={currentTitle}
                    className="mt-1 block w-full"
                    autoComplete="title"
                    isFocused={true}
                    onChange={handleTitleChange}
                />
                <InputError message={errors.titles} className="mt-2" />
            </div>
            <div className="mt-2">
                <InputLabel
                    htmlFor="price"
                    value="Precio de la canción"
                    className="mt-2"
                    children={undefined}
                />
                <TextInput
                    id="song_price"
                    type="text"
                    name="song_price"
                    value={currentSongPrice}
                    className="mt-1 block w-2/12"
                    autoComplete="song_price"
                    isFocused={true}
                    onChange={handleSongPriceChange}
                    onBlur={() => {
                        if (currentSongPrice) {
                            const formattedPrice =
                                parseFloat(currentSongPrice).toFixed(2);
                            setCurrentSongPrice(formattedPrice);
                        }
                    }}
                />
                <InputError message={errors.song_price} className="mt-2" />
            </div>

            <div className="mt-2">
                <TextInput
                    type="file"
                    name="files[]"
                    multiple
                    id="files"
                    onChange={handleFileChange}
                    className="mt-1 w-full inline-flex file:items-center rounded-md border file:border-transparent bg-gray-800 file:px-4 file:py-2 file:text-xs text-xs dis font-semibold uppercase text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 dark:bg-gray-200 dark:text-gray-300 dark:hover:bg-white dark:focus:bg-white dark:focus:ring-offset-gray-800 dark:active:bg-gray-300 hover:cursor-pointer hover:dark:text-black"
                    accept="audio/*"
                />
                <InputError message={errors.files} className="mt-2" />
            </div>

            <div className="relative overflow-x-auto">
                {data.files.length > 0 && (
                    <table className="mt-4 w-full items-center gap-4 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr className="text-gray-300">
                                <th scope="col" className="px-6">
                                    No
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Archivo
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Título
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Precio
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-right"
                                >
                                    Borrar
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.files.map((file, index) => (
                                <tr
                                    key={index}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                >
                                    <td className="px-6 py-4 w-5">
                                        {index + 1}.
                                    </td>
                                    <td className="px-6 py-4 w-10">
                                        {file.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {data.titles[index]}
                                    </td>
                                    <td className="px-6 py-4">
                                        {data.song_price[index]}€
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            title="Add File"
                                            type="button"
                                            onClick={() =>
                                                handleRemoveFile(index)
                                            }
                                            className="ml-auto"
                                        >
                                            <MdOutlineDeleteForever className="w-12 text-2xl hover:text-red-500 hover:text-3xl transition-all" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {progress && (
                <progress value={progress.percentage} max="100">
                    {progress.percentage}%
                </progress>
            )}

            <PrimaryButton className="mt-2" disabled={processing}>
                Upload
            </PrimaryButton>
        </form>
    );
}
