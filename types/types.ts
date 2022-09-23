import { MenuItemProps } from "@mui/material";

export interface IAudioMetadata {
    id: string;
    trackName: string;
    artist: string;
    loved: boolean;
    genre: string;
    path: string;
    size: number;
    picture: any;
    album: string;
    format: string;
    lyrics: string;
    src: string | ArrayBuffer;
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
    picture?: any;
    album?: string;
    format?: string;
    lyrics?: string;
    src?: string | ArrayBuffer;
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
    | "picture"
    | "album"
    | "format"
    | "lyrics"
    | "src"
    | "duration";
