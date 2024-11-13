import Authenticated from "@/Layouts/AuthenticatedLayout";
import UploadForm from "./UploadForm";

export default function UploadAlbum() {


    return (
        <Authenticated
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    UPLOAD ALBUM
                </h2>
            }
        >

            <UploadForm />

        </Authenticated>
    );
}
