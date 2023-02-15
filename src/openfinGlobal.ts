import { fin as MockFin } from 'openfin-adapter/src/mock';

declare global {
    interface Window {
        fin: typeof MockFin;
    }
}

export const fin = window.fin;