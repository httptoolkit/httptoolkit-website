export const isSSR = typeof window === 'undefined';

export function delay(numberMs) {
    return new Promise((resolve) => setTimeout(resolve, numberMs));
}