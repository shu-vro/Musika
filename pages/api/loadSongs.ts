import numeral from "numeral";
import { NextApiRequest, NextApiResponse } from "next";
import ytsr from "ytsr";
import fs from "fs";
import path from "path";

const SAVE_PATH = path.join(process.cwd(), "json", "song_data.json");
async function saveToServer() {
    let search = await ytsr("music", {
        limit: 1000,
    });
    let searchResults = search.items.filter(item => {
        if (item.type === "video") {
            return item.duration && numeral(item.duration).value()! < 300;
        }
    });
    if (!fs.existsSync(path.join(process.cwd(), "json"))) {
        fs.mkdirSync(path.join(process.cwd(), "json"));
    }
    fs.writeFileSync(SAVE_PATH, JSON.stringify(searchResults, null, 4));
}
saveToServer();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    let rf = fs.readFileSync(SAVE_PATH, {
        encoding: "utf-8",
    });
    let searchResults = JSON.parse(rf);
    res.send(searchResults);
}
