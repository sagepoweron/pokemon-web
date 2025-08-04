export function sleep(ms: number)
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function normalize(value: number, min: number, max: number)
{
    if (min === max) return 1;
    return (value - min) / (max - min);
}

export function lerpColor(c1: { r: number; g: number; b: number; }, c2: { r: number; g: number; b: number; }, amt: number) {
    let r = Math.round(c1.r + amt * (c2.r - c1.r));
    let g = Math.round(c1.g + amt * (c2.g - c1.g));
    let b = Math.round(c1.b + amt * (c2.b - c1.b));
    return `rgb(${r}, ${g}, ${b})`;
}