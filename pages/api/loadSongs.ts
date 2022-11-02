import { NextApiRequest, NextApiResponse } from "next";
import ytdl from "ytdl-core";
import { IAudioMetadata } from "@ts/types";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const id  = req.query.id;
        if (!id) {
            res.json({error: true});
            return;
        }
        const url = `https://www.youtube.com/watch?v=${id}`
        res.setHeader('content-type', "audio/mpeg");
        await ytdl(url, {
            filter: 'audioonly',
        }).pipe(res);
      } catch(err){
        console.log('err: ', err);
        res.json(err)
      }
}
