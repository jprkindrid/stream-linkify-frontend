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

export const lchToString = (color: LCH) => {
    return `oklch(${color.l} ${color.c} ${color.h})`;
};

export const withAlphaMix = (color: LCH, alpha: number) => {
    return `color-mix(in oklch, ${lchToString(color)} ${alpha * 100}%, transparent)`;
};
