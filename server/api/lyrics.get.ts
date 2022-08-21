import lf from "lyrics-finder";

export default defineEventHandler(async event => {
    const { song, artist } = useQuery(event);
    if (typeof song !== "string" || typeof artist !== "string")
        return { statusCode: 400, body: "Missing song or artist" };
    let lyrics = "No lyrics found";
    try {
        lyrics = (await lf(song, artist)) || "No lyrics found";
    } catch (e) {
        console.log(e);
    }
    return {
        statusCode: 200,
        lyrics,
    };
});
