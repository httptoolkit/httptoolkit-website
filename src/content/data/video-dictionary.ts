
export interface VideoData {
    lightId: string;
    darkId: string;
}

export const videoDictionary = {
    'chrome': {
        darkId: '77143/de631d3f-c4dd-4bcb-bb16-c5242e815c57',
        lightId: '293624/91477e53-40dd-4290-baef-cb9d9be6de8d'
    }
} as const;

export type VideoKey = keyof typeof videoDictionary;