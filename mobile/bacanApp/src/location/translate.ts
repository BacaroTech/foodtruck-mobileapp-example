import { ita } from './ita';

export type KeyIta = keyof typeof ita;

export function t(k: KeyIta): string {
    if (ita[k]) {
        return ita[k];
    }
    return k as string;
}
