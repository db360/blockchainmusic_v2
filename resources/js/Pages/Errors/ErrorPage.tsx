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
    console.log(errors);
    return (
        <Guest>
            <div className="text-gray-300">
                <h1>Error: {errors.message}</h1>
                {errors.code && <p>Code: {errors.code}</p>}
                {errors.connectionName && (
                    <p>Connection Name: {errors.connectionName}</p>
                )}
                {errors.errorInfo && (
                    <p>
                        Error Info: {errors.errorInfo[0]}, {errors.errorInfo[1]}
                        , {errors.errorInfo[2]}
                    </p>
                )}
            </div>
        </Guest>
    );
};

export default ErrorPage;
