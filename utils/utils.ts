import numeral from "numeral";

export function normalizeTimeFormat(number: number) {
    let a: string = numeral(number).format("00:00:00");
    if (a.substring(0, 2) === "0:") {
        a = a.substring(2, a.length);
        return a;
    }
    return a;
}

export function removeSiteFromTitle(title: string) {
    return title.replace(
        /([\w+]+\:\/\/)?([\w\d-]+\.)*[\w-]+[\.\:]\w+([\/\?\=\&\#\.]?[\w-]+)*\/?/gm,
        ""
    );
}

export function extractThumbnailFromAudio(picture: any) {
    if (!picture) return "";
    let data = picture.data;
    let format = picture.format;
    let base64String = "";
    for (let i = 0; i < data.length; i++) {
        base64String += String.fromCharCode(data[i]);
    }
    return `data:${format};base64,${window.btoa(base64String)}`;
}
