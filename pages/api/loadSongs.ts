import { NextApiRequest, NextApiResponse } from "next";
import ytdl from "ytdl-core";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const id = req.query.id;
        if (!id) {
            res.json({ error: true });
            return;
        }
        const url = `https://www.youtube.com/watch?v=${id}`;
        res.setHeader("content-type", "audio/mpeg");
        ytdl(url, {
            filter: "audioonly",
        })
            .on("response", response => {
                res.setHeader(
                    "content-length",
                    response.headers["content-length"]
                );
                console.log("response: ", response);
            })
            .pipe(res);
    } catch (err) {
        console.log("err: ", err);
        res.json(err);
    }
}
