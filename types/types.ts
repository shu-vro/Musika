export interface IAudioMetadata {
    id?: any;
    trackName?: any;
    artist?: any;
    loved?: boolean;
    genre?: any;
    path?: string;
    size?: number;
    picture?: any;
    album?: any;
    format?: string;
    lyrics?: string;
}

export type IArrayAudioMetaData = Array<IAudioMetadata>;
