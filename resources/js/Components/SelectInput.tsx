import { forwardRef, ReactNode, SelectHTMLAttributes, useEffect, useImperativeHandle, useRef } from 'react';

export interface SelectInputProps extends SelectHTMLAttributes<HTMLSelectElement> {
    className?: string;
    isFocused?: boolean;
    children: ReactNode | undefined;
}

export interface SelectInputRef {
    focus: () => void;
}

export default forwardRef<SelectInputRef, SelectInputProps>(function SelectInput(
    { className = '', isFocused = false, children, ...props },
    ref,
) {
    const localRef = useRef<HTMLSelectElement>(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <select
            {...props}
            className={
                'rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600 ' +
                className
            }
            ref={localRef}
        >
            {children}
        </select>
    );
});