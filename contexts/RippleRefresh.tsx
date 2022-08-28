import { createContext, useContext, useState } from "react";

let Context = createContext({});

export function useRippleRefresh(): {
    refresh?: VoidFunction;
    value?: NodeListOf<HTMLElement>;
} {
    return useContext(Context);
}

export function RippleRefreshContext({ children }) {
    const [value, setValue] = useState<NodeListOf<HTMLElement> | undefined[]>(
        []
    );
    function refresh() {
        setTimeout(() => {
            setValue(document.querySelectorAll(".ripple"));
        }, 1000);
    }
    return (
        <>
            <Context.Provider value={{ refresh, value }}>
                {children}
            </Context.Provider>
        </>
    );
}
