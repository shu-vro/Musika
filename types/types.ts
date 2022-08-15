export interface IAudioMetadata {
    id?: any;
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
}

export type IArrayAudioMetaData = Array<IAudioMetadata>;
