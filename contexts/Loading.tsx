import { createContext, useContext, useState } from "react";

let Context = createContext({});

export function useLoading(): {
    value?: boolean;
    setValue?: React.Dispatch<React.SetStateAction<boolean>>;
} {
    return useContext(Context);
}

export function LoadingContext({ children }) {
    const [value, setValue] = useState(false);
    return (
        <>
            <Context.Provider value={{ value, setValue }}>
                {children}
            </Context.Provider>
        </>
    );
}
