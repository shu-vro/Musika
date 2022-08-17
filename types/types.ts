export interface IAudioMetadata {
    id: any;
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

export type IArrayAudioMetaData = Array<IAudioMetadata>;
