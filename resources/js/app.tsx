import "../css/app.css";
import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./context/ThemeContext";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import { StrictMode } from "react";
import { AudioPlayerProvider } from "./context/AudioPlayerContext";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob("./Pages/**/*.tsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <StrictMode>
                <Provider store={store}>
                    <ThemeProvider>
                        <AudioPlayerProvider>
                            <App {...props} />
                        </AudioPlayerProvider>
                    </ThemeProvider>
                </Provider>
            </StrictMode>
        );
    },
    progress: {
        color: "#4B5563",
    },
});
