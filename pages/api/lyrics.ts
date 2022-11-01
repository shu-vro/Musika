import lf from "lyrics-finder";
import { NextApiRequest } from "next";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req: NextApiRequest, res) {
    const { song, artist } = req.query;
    if (typeof song !== "string" || typeof artist !== "string")
        res.status(422).json({ lyrics: "Invalid Parameters", fetched: false });
    try {
        let lyrics = await lf(song, artist);
        if (lyrics != "") {
            res.status(200).json({ lyrics, fetched: true });
            return;
        }
        return res
            .status(200)
            .json({ lyrics: "No lyrics found in database", fetched: false });
    } catch (e) {
        console.log(e);
        res.status(404).json({ lyrics: "error ocurred" });
    }
}
