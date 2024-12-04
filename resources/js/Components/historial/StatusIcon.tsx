export default function StatusIcon({status}:{status: 'completed' | 'failed' | 'pending'}) {
    return (
        <span
                                        className={`inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full
        ${
            status === "completed"
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                : status === "failed"
                ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
        }`}
                                    >
                                        <span
                                            className={`w-2 h-2 me-1 rounded-full
            ${
                status === "completed"
                    ? "bg-green-500"
                    : status === "failed"
                    ? "bg-red-500"
                    : "bg-yellow-500"
            }`}
                                        ></span>
                                        {status}
                                    </span>
    )
}