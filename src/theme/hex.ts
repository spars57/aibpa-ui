export function darkenHexColor(hex: string, percentage: number = 20): string {
    // Remove the leading '#' if present
    hex = hex.replace(/^#/, '');

    // If the hex code is shorthand (3 characters), convert it to 6 characters
    if (hex.length === 3) {
        hex = hex
            .split('')
            .map((char) => char + char)
            .join('');
    }

    // Convert the hex color to RGB
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    // Darken each component by the given percentage
    const darken = (color: number) => Math.max(0, Math.min(255, Math.round(color * (1 - percentage / 100))));

    const newR = darken(r);
    const newG = darken(g);
    const newB = darken(b);

    // Convert the darkened RGB values back to hex
    const toHex = (color: number) => color.toString(16).padStart(2, '0');

    return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`;
}

export function lightenHexColor(hex: string, percentage = 20) {
    // Remove the leading '#' if present
    hex = hex.replace(/^#/, '');

    // If the hex code is shorthand (3 characters), convert it to 6 characters
    if (hex.length === 3) {
        hex = hex
            .split('')
            .map((char) => char + char)
            .join('');
    }

    // Convert the hex color to RGB
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    // Lighten each component by the given percentage
    const lighten = (color: number) =>
        Math.max(0, Math.min(255, Math.round(color + (255 - color) * (percentage / 100))));

    const newR = lighten(r);
    const newG = lighten(g);
    const newB = lighten(b);

    // Convert the lightened RGB values back to hex
    const toHex = (color: number) => color.toString(16).padStart(2, '0');

    return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`;
}
