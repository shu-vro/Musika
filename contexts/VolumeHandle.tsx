import { createContext, useContext, useState } from "react";

const Context = createContext({});

export function useVolumeHandle(): {
    value?: number;
    setValue?: React.Dispatch<React.SetStateAction<number>>;
} {
    return useContext(Context);
}

export function VolumeHandleContext({ children }) {
    const [value, setValue] = useState(100);
    return (
        <>
            <Context.Provider value={{ value, setValue }}>
                {children}
            </Context.Provider>
        </>
    );
}
