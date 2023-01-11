import "./assets/index.css";

import { createRoot } from "react-dom/client";
import ApolloProvider from "./providers/ApolloProvider";

const container = document.getElementById("app") as HTMLElement;
const root = createRoot(container);

root.render(
    ApolloProvider
);