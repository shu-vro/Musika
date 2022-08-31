import { createContext, useContext, useState } from "react";
import type { IArrayAudioMetaData } from "@ts/types";

const Context = createContext({});

export function useMusicStore(): {
    value?: IArrayAudioMetaData;
    setValue?: React.Dispatch<React.SetStateAction<IArrayAudioMetaData>>;
    queue?: IArrayAudioMetaData;
    setQueue?: React.Dispatch<React.SetStateAction<IArrayAudioMetaData>>;
    /**
     * @param search - search query.
     * @returns Array of `IArrayAudioMetaData`
     */
    getFromSearch?: (search: string) => any[];
} {
    return useContext(Context);
}

export function MusicStoreContext({ children }) {
    const [value, setValue] = useState<IArrayAudioMetaData>([]);
    const [queue, setQueue] = useState<IArrayAudioMetaData>([]);

    function getFromSearch(search: string) {
        let result = [];
        let arr = value.map(e => e?.[search]);
        if (arr.length === 0) return result;
        arr = [...new Set(arr)];

        arr.forEach(el => {
            let filtered = value.filter(e => e[search] === el);
            result.push(filtered);
        });
        return result;
    }
    return (
        <>
            <Context.Provider
                value={{ value, setValue, queue, setQueue, getFromSearch }}>
                {children}
            </Context.Provider>
        </>
    );
}
