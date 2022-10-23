import { PictureType } from "jsmediatags/types";
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

export function imageResize(
    data: string,
    sizes = ["92x92", "original"]
): Object {
    let result = {};
    sizes.forEach(size => {
        const image = new Image();
        image.src = data;
        image.onload = () => {
            let width = 0,
                height = 0;
            if (size === "original") {
                return (result[size] = data);
            } else {
                [width, height] = size.split("x").map(e => Number(e));
            }
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = width;
            canvas.height = height;
            ctx?.drawImage(image, 0, 0, canvas.width, canvas.height);
            let imageData = canvas.toDataURL();
            result[size] = imageData;
            canvas.remove();
            image.remove();
        };
    });
    return result;
}
export function _arrayBufferToBase64(buffer, format) {
    var binary = "";
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return `data:${format};base64,${window.btoa(binary)}`;
}
export function extractThumbnailFromAudio(picture: PictureType): object {
    if (!picture) return {};
    let data = picture.data;
    let format = picture.format;
    let base64String = "";
    for (let i = 0; i < data.length; i++) {
        base64String += String.fromCharCode(data[i]);
    }
    let dataURL = `data:${format};base64,${window.btoa(base64String)}`;
    return imageResize(dataURL);
}

export function object_equals(x, y) {
    if (x === y) return true;
    // if both x and y are null or undefined and exactly the same

    if (!(x instanceof Object) || !(y instanceof Object)) return false;
    // if they are not strictly equal, they both need to be Objects

    if (x.constructor !== y.constructor) return false;
    // they must have the exact same prototype chain, the closest we can do is
    // test there constructor.

    for (var p in x) {
        if (!x.hasOwnProperty(p)) continue;
        // other properties were tested using x.constructor === y.constructor

        if (p === "picture") continue;
        // Picture is a constant array. This will never change. So omitting it

        if (!y.hasOwnProperty(p)) return false;
        // allows to compare x[ p ] and y[ p ] when set to undefined

        if (x[p] === y[p]) continue;
        // if they have the same strict value or identity then they are equal

        if (typeof x[p] !== "object") return false;
        // Numbers, Strings, Functions, Booleans must be strictly equal

        if (!object_equals(x[p], y[p])) return false;
        // Objects and Arrays must be tested recursively
    }

    for (p in y) if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) return false;
    // allows x[ p ] to be set to undefined

    return true;
}

export function arraysEqual(a: Array<any> | null, b: Array<any> | null) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    // Please note that calling sort on an array will modify that array.
    // you might want to clone your array first.

    for (var i = 0; i < a.length; ++i) {
        if (a[i] instanceof Object || b[i] instanceof Object) {
            return object_equals(a[i], b[i]);
        } else if (a[i] !== b[i]) return false;
    }
    return true;
}

export function stringToRegex(s: string): RegExp {
    let m: any = [];
    return (m = s.match(/^([\/~@;%#'])(.*?)\1([gimsuy]*)$/))
        ? new RegExp(
              m[2],
              m[3]
                  .split("")
                  .filter((i: number, p: any, s: any[]) => s.indexOf(i) === p)
                  .join("")
          )
        : new RegExp(s);
}
