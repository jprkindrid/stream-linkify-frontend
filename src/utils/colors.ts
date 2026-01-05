import { converter } from "culori";

export type LCH = {
    l: number;
    c: number;
    h: number;
};

export const tempAccent: LCH = {
    l: 0.72,
    c: 0.185,
    h: 49.63,
};

const IMAGE_SIZE = 100;

const toOklch = converter("oklch");

export const lchToString = (color: LCH) => {
    return `oklch(${color.l} ${color.c} ${color.h})`;
};

export const withAlphaMix = (color: LCH, alpha: number) => {
    return `color-mix(in oklch, ${lchToString(color)} ${alpha * 100}%, transparent)`;
};

export function boostVibrancy(color: LCH): LCH {
    return {
        l: Math.max(0.5, Math.min(0.75, color.l)),
        c: Math.max(color.c * 1.4, 0.12),
        h: color.h,
    };
}
export async function getAverageColorFromImage(imageUrl: string): Promise<LCH> {
    const img = new Image();
    img.crossOrigin = "anonymous";

    await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () =>
            reject(new Error("Failed to load image for conversion"));
        img.src = imageUrl;
    });

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = IMAGE_SIZE;
    canvas.height = IMAGE_SIZE;

    ctx?.drawImage(img, 0, 0, IMAGE_SIZE, IMAGE_SIZE);

    const imageData = ctx?.getImageData(0, 0, IMAGE_SIZE, IMAGE_SIZE);
    if (!imageData) throw new Error("Failed to get image data");

    const { data } = imageData;

    let r = 0,
        g = 0,
        b = 0;

    let pixelCount = 0;

    for (let i = 0; i < data.length; i += 4) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
        // i + 3 is alpha and I dont care
        pixelCount++;
    }

    const rgbValue = (val: number) => val / pixelCount / 255;

    const color = toOklch({
        mode: "rgb",
        r: rgbValue(r),
        g: rgbValue(g),
        b: rgbValue(b),
    });

    if (!color) throw new Error("Failed to convert color");

    return {
        l: color.l,
        c: color.c,
        h: color.h ?? 0,
    };
}
