import { createContext, useContext, useState } from "react";
import type {
    IArrayAudioMetaData,
    IAudioMetadata,
    IAudioOptionalMetadata,
    ISearchFromValues,
    TAudioMetadataField,
} from "@ts/types";
import { stringToRegex } from "@utils/utils";
import { openDB } from "idb";

const Context = createContext({});

export function useMusicStore(): {
    value?: IArrayAudioMetaData;
    setValue?: React.Dispatch<React.SetStateAction<IArrayAudioMetaData>>;
    queue?: IArrayAudioMetaData;
    setQueue?: React.Dispatch<React.SetStateAction<IArrayAudioMetaData>>;
    /**
     * @param search - search query. a valid key from [TAudioMetadataField](../types/types.ts)
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
     * const array = getFromField({artist: 'some artist'})
     * console.log(array)
     * ```
     * @param {IAudioOptionalMetadata} getters
     * @returns {IArrayAudioMetaData} IArrayAudioMetaData
     */
    getFromField?: (getters: IAudioOptionalMetadata) => IArrayAudioMetaData;
    getFromMultipleIds?: (array: Array<IDBValidKey>) => IArrayAudioMetaData;
    /** Find Value from any object inside the music store
     *
     * It does not match `picture`, `src`, `loved`, `lyrics`, `id`, `format`, `duration` fields
     * @param {String} search - a value in `IAudioMetadata` that might exist in `IArrayAudioMetaData`
     * @example
     * ```
     * let sfv = SearchFromValues('some audio data')
     * console.log(sfv)
     *
     * /* returns
     * [
     *      {
     *          element: IAudioMetadata,
     *          key: TAudioMetadataField,
     *          matched: ['some audio data']
     *      },
     *      ...
     * ]
     * *\/
     * ```
     * @returns [ISearchFromValues[]](../types/types.ts)
     */
    SearchFromValues?: (search: string) => ISearchFromValues[][];

    /**
     * Takes a song as argument and deletes it from queue.
     * @param {IAudioMetadata} song - to delete
     * @param {boolean} fromTrack - if to delete it from musicStore also. (optional)
     */
    deleteTrack?: (song: IAudioMetadata, fromTrack?: boolean) => void;
} {
    return useContext(Context);
}

export function MusicStoreContext({ children }) {
    const [value, setValue] = useState<IArrayAudioMetaData>([]);
    const [queue, setQueue] = useState<IArrayAudioMetaData>([]);

    function getFromSearch(search: TAudioMetadataField) {
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

    function getFromMultipleIds(array: Array<IDBValidKey>) {
        let result = [];
        array.forEach(id => {
            result.push(...value.filter(e => e.id === id));
        });
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

    function SearchFromValues(search: string): ISearchFromValues[][] {
        if (search === "") return [[]];
        let s = stringToRegex(search);
        let tempResult: ISearchFromValues[] = [];
        let arrayResult: any = [];
        let fields: TAudioMetadataField[] = [
            "trackName",
            "artist",
            "album",
            "genre",
            "lyrics",
        ];

        value.forEach(el => {
            for (const key in el) {
                if (!fields.includes(key as TAudioMetadataField)) continue;
                if (Object.prototype.hasOwnProperty.call(el, key)) {
                    const v: string = String(el[key]);
                    const matched = v.match(RegExp(s, "gi"));
                    if (matched) {
                        tempResult.push({
                            element: el,
                            key: key as TAudioMetadataField,
                            matched,
                        });
                    }
                }
            }
        });
        fields.forEach(field => {
            let f = tempResult.filter(e => e.key === field);
            arrayResult.push(f);
        });
        return arrayResult;
    }

    function deleteTrack(song: IAudioMetadata, fromTrack = false) {
        (async () => {
            const db = await openDB("MUSIC_STORE_DB", 1, {
                upgrade(database, oldVersion, newVersion, transaction) {
                    database.createObjectStore("music_store", {
                        keyPath: "id",
                        autoIncrement: true,
                    });
                    database.createObjectStore("queue_store", {
                        keyPath: "id",
                        autoIncrement: true,
                    });
                    database.createObjectStore("selected_music_store", {
                        keyPath: "id",
                        autoIncrement: true,
                    });
                },
            });
            setQueue(prev => {
                if (prev.length === 0) {
                    let temp = prev.filter(e => e.id !== song.id);
                    if (temp.length === 0) {
                        db.clear("queue_store");
                    }
                    return temp;
                }
                return prev.filter(e => e.id !== song.id);
            });

            if (fromTrack) {
                setValue(prev => {
                    let temp = prev.filter(e => e.id !== song.id);
                    if (temp.length === 0) {
                        db.clear("music_store");
                    }
                    return temp;
                });
            }
        })();
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
                    SearchFromValues,
                    getFromMultipleIds,
                    deleteTrack,
                }}
            >
                {children}
            </Context.Provider>
        </>
    );
}
