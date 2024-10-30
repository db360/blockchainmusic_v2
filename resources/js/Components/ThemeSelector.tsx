import { useEffect, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { FaMoon, FaSun, FaDesktop } from "react-icons/fa";

type Theme = "dark" | "light" | "system"; // Define el tipo

const DropdownMenu = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { theme, setTheme } = useTheme();
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleThemeChange = (newTheme: Theme) => {
        setTheme(newTheme);
        setIsDropdownOpen(false);
    };

    const themeIcon =
        theme === "dark" ? (
            <FaMoon />
        ) : theme === "light" ? (
            <FaSun />
        ) : (
            <FaDesktop />
        );

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={toggleDropdown}
                id="dropdownDefaultButton"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-600 dark:hover:bg-slate-300 dark:hover:text-gray-600 dark:focus:ring-white"
                type="button"
            >
                {themeIcon}
                <svg
                    className="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                    />
                </svg>
            </button>

            {/* Dropdown Menu */}
            <div
                id="dropdown"
                className={`absolute top-full left-0 mt-2 z-10 ${
                    isDropdownOpen ? "block" : "hidden"
                } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
            >
                <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownDefaultButton"
                >
                    <li
                        onClick={() => handleThemeChange("dark")}
                        className="cursor-pointer"
                    >
                        <span
                            className={`flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${
                                theme === "dark" ? "font-semibold" : ""
                            }`}
                        >
                            <FaMoon className="mr-2" /> Dark
                        </span>
                    </li>
                    <li
                        onClick={() => handleThemeChange("light")}
                        className="cursor-pointer"
                    >
                        <span
                            className={`flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${
                                theme === "light" ? "font-semibold" : ""
                            }`}
                        >
                            <FaSun className="mr-2" /> Light
                        </span>
                    </li>
                    <li
                        onClick={() => handleThemeChange("system")}
                        className="cursor-pointer"
                    >
                        <span
                            className={`flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${
                                theme === "system" ? "font-semibold" : ""
                            }`}
                        >
                            <FaDesktop className="mr-2" /> System
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default DropdownMenu;
