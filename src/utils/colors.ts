import { converter } from "culori";

export type LCH = {
    l: number;
    c: number;
    h: number;
};

export const defaultAccent: LCH = {
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

function boostVibrancy(color: LCH): LCH {
    return {
        l: Math.max(0.55, Math.min(0.7, color.l)),
        c: Math.max(color.c * 2, 0.18), // Bump these up
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

    let totalWeight = 0;

    for (let i = 0; i < data.length; i += 4) {
        const pr = data[i];
        const pg = data[i + 1];
        const pb = data[i + 2];

        // Skip Near Blacks
        const brightness = (pr + pg + pb) / 3;
        if (brightness < 40) continue;

        // Weight by saturation - more colorful pixels count more
        const max = Math.max(pr, pg, pb);
        const min = Math.min(pr, pg, pb);
        const saturation = max === 0 ? 0 : (max - min) / max;

        if (saturation < 0.1) continue; // Skip grays

        // We really, really want the saturation to dominate
        const weight = saturation ** 10;

        r += pr * weight;
        g += pg * weight;
        b += pb * weight;
        totalWeight += weight;
    }

    if (totalWeight === 0) return defaultAccent;

    const rgbValue = (val: number) => val / totalWeight / 255;

    const color = toOklch({
        mode: "rgb",
        r: rgbValue(r),
        g: rgbValue(g),
        b: rgbValue(b),
    });

    if (!color) throw new Error("Failed to convert color");

    return boostVibrancy({
        l: color.l,
        c: color.c,
        h: color.h ?? 0,
    });
}
