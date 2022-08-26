import { createContext, useContext, useState } from "react";

const Context = createContext({});

export function useShrinkNavigation(): {
    value?: boolean;
    setValue?: React.Dispatch<React.SetStateAction<boolean>>;
} {
    return useContext(Context);
}

export function ShrinkNavigationContext({ children }) {
    const [value, setValue] = useState(false);
    return (
        <>
            <Context.Provider value={{ value, setValue }}>
                {children}
            </Context.Provider>
        </>
    );
}
