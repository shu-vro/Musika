import { createContext, useContext, useState } from "react";
import type {
    IArrayAudioMetaData,
    IAudioMetadata,
    IAudioOptionalMetadata,
} from "@ts/types";

const Context = createContext({});

export function useMusicStore(): {
    value?: IArrayAudioMetaData;
    setValue?: React.Dispatch<React.SetStateAction<IArrayAudioMetaData>>;
    queue?: IArrayAudioMetaData;
    setQueue?: React.Dispatch<React.SetStateAction<IArrayAudioMetaData>>;
    /**
     * @param search - search query.
     * @returns Array of [IArrayAudioMetaData](../types/types.ts)
     */
    getFromSearch?: (search: string) => any[];

    /**
     * Set new [IArrayAudioMetaData](../types/types.ts) from given id of an individual [IAudioMetaData.id](../types/types.ts)
     * @param {string} id of the track
     * @param {IAudioOptionalMetadata} setters object. the values that should be changed to that Id. Should not change `id`, `picture`, `src`
     * @return void
     */
    setUsingId?: (id: string, setters: IAudioOptionalMetadata) => void;
    /**
     * @example
     * ```js
     * const array = getFromField({artist: 'Arijit Singh})
     * console.log(array)
     * ```
     * @param {IAudioOptionalMetadata} getters
     * @returns {IArrayAudioMetaData} IArrayAudioMetaData
     */
    getFromField?: (getters: IAudioOptionalMetadata) => IArrayAudioMetaData;
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

    function getFromField(getters: IAudioOptionalMetadata) {
        let result = [];
        for (const key in getters) {
            if (Object.prototype.hasOwnProperty.call(getters, key)) {
                const v = getters[key];
                result.push(...value.filter(e => e?.[key] === v));
            }
        }
        return result;
    }

    function setUsingId(id: string, setters: IAudioOptionalMetadata) {
        let setNewObject = (
            obj: IArrayAudioMetaData,
            setObj: React.Dispatch<React.SetStateAction<IArrayAudioMetaData>>
        ) => {
            let index = obj.findIndex(e => e.id === id);
            if (index < 0)
                return console.log("From MusicStore: No Id matching", id);
            let song = obj[index] || {};

            for (const key in setters) {
                if (Object.prototype.hasOwnProperty.call(setters, key)) {
                    const value = setters[key];

                    if (key.match(/^id$|^picture$|^src$/))
                        return console.log(
                            "Attempt to change immutable data. Skipping: " + key
                        );
                    song[key] = value;
                }
            }
            setObj(prev => {
                let a = [...prev];
                a[index] = song as IAudioMetadata;
                return a;
            });
        };

        setNewObject(value, setValue);
        setNewObject(queue, setQueue);
    }
    return (
        <>
            <Context.Provider
                value={{
                    value,
                    queue,
                    setValue,
                    setQueue,
                    getFromSearch,
                    setUsingId,
                    getFromField,
                }}
            >
                {children}
            </Context.Provider>
        </>
    );
}
