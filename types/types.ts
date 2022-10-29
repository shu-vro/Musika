import { MenuItemProps } from "@mui/material";

export interface IAudioMetadata {
    id: string;
    trackName: string;
    artist: string;
    loved: boolean;
    genre: string;
    path: string;
    size: number;
    thumbnail: Object;
    album: string;
    format: string;
    lyrics: string;
    src: string;
    duration: number;
}

export interface IAudioOptionalMetadata {
    id?: string;
    trackName?: string;
    artist?: string;
    loved?: boolean;
    genre?: string;
    path?: string;
    size?: number;
    thumbnail?: Object;
    album?: string;
    format?: string;
    lyrics?: string;
    src?: string;
    duration?: number;
}

export type IArrayAudioMetaData = Array<IAudioMetadata>;

export interface ILyricsObject {
    statusCode: number;
    lyrics: string;
}

export type IArrayMoreButtons = {
    name: string;
    icon: React.ReactNode;
    cb: VoidFunction;
    rest?: MenuItemProps;
}[];

export interface ISearchFromValues {
    element: IAudioMetadata;
    key: TAudioMetadataField;
    matched: string[];
}

export type TAudioMetadataField =
    | "id"
    | "trackName"
    | "artist"
    | "loved"
    | "genre"
    | "path"
    | "size"
    | "thumbnail"
    | "album"
    | "format"
    | "lyrics"
    | "src"
    | "duration";

export type TSettingsArray = {
    title: string;
    settings: {
        title: string;
        description: string;
        operation: {
            [x: string]: any;
        };
        callback: (newValue: unknown) => void;
    }[];
}[];
