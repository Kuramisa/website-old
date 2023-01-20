import { createContext, useState } from "react";
import { MessageObject } from "../react-app-env";

const MessageContext = createContext({
    message: null as any,
    setMessage: (message: MessageObject) => message,
    clearMessage: () => {
    }
});

const MessageProvider = (props: any) => {
    const [message, setMessage] = useState<MessageObject | null>();

    const clearMessage = () => setMessage(null);

    return (
        <MessageContext.Provider
            value={{ message, setMessage, clearMessage }}
            {...props}
        />
    );
};

export { MessageContext, MessageProvider };

