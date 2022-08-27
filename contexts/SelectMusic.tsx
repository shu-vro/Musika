import { createContext, useContext, useState } from "react";
import type { IAudioMetadata } from "@ts/types";

const Context = createContext({});

export function useSelectMusic(): {
    value?: boolean;
    setValue?: React.Dispatch<React.SetStateAction<IAudioMetadata>>;
} {
    return useContext(Context);
}

export function SelectMusicContext({ children }) {
    const [value, setValue] = useState<IAudioMetadata>(null);
    return (
        <>
            <Context.Provider value={{ value, setValue }}>
                {children}
            </Context.Provider>
        </>
    );
}
