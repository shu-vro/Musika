import lf from "lyrics-finder";

export default defineEventHandler(async event => {
    const { song, artist } = useQuery(event);
    if (typeof song !== "string" || typeof artist !== "string")
        return { statusCode: 400, body: "Missing song or artist" };
    let lyrics = (await lf(song, artist)) || "No lyrics found";
    return {
        statusCode: 200,
        api: "works",
        lyrics,
    };
});
