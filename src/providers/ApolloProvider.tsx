import App from "../App";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../reducers";

import { ApolloClient, ApolloLink, ApolloProvider, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { RetryLink } from "@apollo/client/link/retry";

import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./AuthProvider";
import { MessageProvider } from "./MessageProvider";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const { REACT_APP_SERVER_URL } = process.env;

const httpLink = createHttpLink({
    uri: REACT_APP_SERVER_URL
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("kuramisaToken");
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ""
        }
    };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) => {
            console.log(
                `[GraphQL Error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            );
        });
    }
    if (networkError) console.log(`[Network Error]: ${networkError}`);
});

const retryLink = new RetryLink({
    delay: {
        initial: 300,
        max: Infinity,
        jitter: true
    },
    attempts: {
        max: 5,
        retryIf: (error) => !!error
    }
});

const link = ApolloLink.from([retryLink, errorLink, authLink, httpLink]);
const cache = new InMemoryCache();

const client = new ApolloClient({
    link,
    cache,
    credentials: "include"
});

const darkTheme = createTheme({
    palette: {
        mode: "dark"
    },
    typography: {
        fontFamily: [
            "-apple-system",
            "BlinkMacSystemFont",
            "\"Segoe UI\"",
            "Roboto",
            "\"Helvetica Neue\"",
            "Arial",
            "sans-serif",
            "\"Apple Color Emoji\"",
            "\"Segoe UI Emoji\"",
            "\"Segoe UI Symbol\""
        ].join(",")
    }
});

export default (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <ApolloProvider client={client}>
                <Router>
                    <MessageProvider>
                        <AuthProvider>
                            <ThemeProvider theme={darkTheme}>
                                <CssBaseline enableColorScheme={true} />
                                <App />
                            </ThemeProvider>
                        </AuthProvider>
                    </MessageProvider>
                </Router>
            </ApolloProvider>
        </PersistGate>
    </Provider>
);