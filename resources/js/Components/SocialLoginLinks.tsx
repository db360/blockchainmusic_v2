import { FaGithub, FaGoogle } from "react-icons/fa";

export default function SocialLoginLinks() {
    return (
        <div className="-mx-3 flex flex-1 justify-center">
            <div className="grid grid-cols-2 gap-5 py-8">
                <a
                    title="github login"
                    className="dark:text-white"
                    href="/socialite/github"
                >
                    <FaGithub size={45} />
                </a>
                <a
                    title="google login"
                    className="dark:text-white"
                    href="/socialite/google"
                >
                    <FaGoogle size={45} />
                </a>
            </div>
        </div>
    );
}
