import lf from "lyrics-finder";
import { NextApiRequest } from "next";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req: NextApiRequest, res) {
    const { song, artist } = req.query;
    let lyrics = "No lyrics found";
    if (typeof song !== "string" || typeof artist !== "string")
        res.status(200).json({ lyrics });
    try {
        lyrics = await lf(song, artist) || "No lyrics found";
    } catch (e) {
        console.log(e);
    }
    res.status(200).json({ lyrics });
}
