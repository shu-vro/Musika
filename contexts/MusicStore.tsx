import { createContext, useContext, useState } from "react";
import type { IArrayAudioMetaData } from "@ts/types";

const Context = createContext({});

export function useMusicStore(): {
    value?: IArrayAudioMetaData;
    setValue?: React.Dispatch<React.SetStateAction<IArrayAudioMetaData>>;
} {
    return useContext(Context);
}

export function MusicStoreContext({ children }) {
    const [value, setValue] = useState<IArrayAudioMetaData>([]);
    return (
        <>
            <Context.Provider value={{ value, setValue }}>
                {children}
            </Context.Provider>
        </>
    );
}
