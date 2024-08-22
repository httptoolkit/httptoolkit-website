
export interface VideoData {
    lightId: string;
    darkId: string;
}

export const videoDictionary = {
    'chrome': {
        darkId: '77143/de631d3f-c4dd-4bcb-bb16-c5242e815c57',
        lightId: '293624/91477e53-40dd-4290-baef-cb9d9be6de8d'
    },
    'javascript': {
        darkId: '77143/7bf7fc19-5fa6-4676-8e2c-cb86feedc1e7',
        lightId: '293624/5a49c011-c955-410f-a133-58a6741e9224'
    },
    'python': {
        darkId: '77143/f0af665e-ad3a-4de9-b45a-2362051389a1',
        lightId: '293624/cef9a910-c75f-430f-b69e-bf798010c8a4'
    },
    'ruby': {
        darkId: '77143/01483aac-60a5-4611-bc4a-c3cba9310033',
        lightId: '293624/7ae7d7f5-9833-416f-aa3a-6c67e524de6e'
    }
} as const;

export type VideoKey = keyof typeof videoDictionary;