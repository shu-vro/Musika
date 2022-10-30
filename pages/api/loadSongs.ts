import numeral from "numeral";
import { NextApiRequest, NextApiResponse } from "next";
import ytsr from "ytsr";
import fs, { promises } from "fs";
import path from "path";
import { IAudioMetadata } from "@ts/types";

const SAVE_PATH = path.join(process.cwd(), "json", "song_data.json");
const TWENTY_FOUR_HOURS_TO_MILLISECONDS = 86400000;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    let { q, lim } = req.query;
    if (!q) {
        q = "no copyright sounds";
    }
    if (!lim) {
        lim = "100";
    }
    async function searchAndSave(param = q as string, limit = Number(lim)) {
        try {
            let searched = await ytsr(param, {
                limit,
            });
            let searchResults = searched.items
                .filter(item => {
                    if (item.type === "video") {
                        return (
                            item.duration &&
                            numeral(item.duration).value()! < 300 &&
                            !item.isLive
                        );
                    }
                })
                .map(item => {
                    if (item.type === "video") {
                        return {
                            id: item.id,
                            trackName: item.title,
                            artist: item.author.name,
                            thumbnail: {
                                "92x92": item.thumbnails[1]?.url
                                    ? item.thumbnails[1].url
                                    : item.thumbnails[0]?.url,
                                original: item.bestThumbnail?.url,
                            },
                            duration: numeral(item.duration).value(),
                            loved: false,
                            path: "youtube",
                            lyrics: "",
                            format: "audio/mp3",
                            size: 10000,
                            src: "",
                            album: "unknown",
                            genre: "unknown",
                        } as IAudioMetadata;
                    }
                });
            let result = {
                last_updated: Date.now(),
                searched_for: searched.correctedQuery,
                data: searchResults,
            };
            if (!fs.existsSync(SAVE_PATH)) {
                promises.appendFile(
                    SAVE_PATH,
                    JSON.stringify(result, null, 2),
                    {
                        encoding: "utf-8",
                    }
                );
            } else {
                promises.writeFile(SAVE_PATH, JSON.stringify(result, null, 2), {
                    encoding: "utf-8",
                });
            }
            return result;
        } catch (e) {
            console.log(e);
        }
    }
    return new Promise(async (resolve, reject) => {
        try {
            if (!fs.existsSync(SAVE_PATH)) {
                let body = await searchAndSave();
                res.json(body);
                return resolve(body);
            }
            let previous_song_data = JSON.parse(
                await promises.readFile(SAVE_PATH, {
                    encoding: "utf-8",
                })
            );
            if (
                previous_song_data.last_updated +
                    TWENTY_FOUR_HOURS_TO_MILLISECONDS <
                Date.now()
            ) {
                let a = await searchAndSave();
                res.json(a);
            } else {
                res.json(previous_song_data);
            }
            return resolve(previous_song_data);
        } catch (e) {
            res.json(e);
            resolve(e);
        }
    });
}
