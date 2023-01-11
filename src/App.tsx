import { useQuery } from "@apollo/client";
import { FetchClientUser } from "./gql/queries/client";

import Loading from "./components/Loading";

const App = () => {
    if (process.env.NODE_ENV !== "development") {
        console.log("%cStop!", "color: red; font-size: 40px; font-weight: bold;");
        console.log(
            "%cDo not enter any scripts or some sort of \"hack\" here, it will most likely compromise your account and steal your information",
            "font-size: 30px; font-weight: bold;"
        );
        console.log(
            "%cThis browser feature is intended for developers only",
            "font-size: 30px; font-weight: bold;"
        );
    }

    const { loading, error, data: { clientUser: bot } = {} } = useQuery(FetchClientUser, { pollInterval: 100000 });

    if (loading) return <Loading />;

    return (
        <></>
    );
};

export default App;
