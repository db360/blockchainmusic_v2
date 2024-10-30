import Guest from "@/Layouts/GuestLayout";
import React from "react";

interface Throwable {
    message: string;
    code?: number;
    connectionName?: string;
    errorInfo?: [string, number, string];
}

interface ErrorResponse {
    errors: Throwable;
}

const ErrorPage: React.FC<ErrorResponse> = ({ errors }) => {
    console.log(errors)
    return (
        <Guest>
            <div className="dark:text-gray-300">
                <h1 className="text-red-500 text-justify">Error: {errors.connectionName}</h1>
                {errors.code && <p>Code: {errors.code}</p>}
                {errors.errorInfo && (
                    <p>
                        {errors.errorInfo[0]}, {errors.errorInfo[1]},
                        {errors.errorInfo[2]}
                    </p>
                )}
            </div>
        </Guest>
    );
};

export default ErrorPage;
