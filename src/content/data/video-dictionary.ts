
export interface VideoData {
    lightId: string;
    darkId: string;
    aspectRatio: string;
}

export const lightLibraryId = '293624';
export const lightPullZoneId = 'vz-232e9c2f-cfb';

export const darkLibraryId = '77143';
export const darkPulLZoneId = 'vz-7ada43d8-9d3';

export const videoDictionary = {
    'chrome': {
        darkId: 'de631d3f-c4dd-4bcb-bb16-c5242e815c57',
        lightId: '91477e53-40dd-4290-baef-cb9d9be6de8d',
        aspectRatio: '16/9'
    },
    'javascript': {
        darkId: '7bf7fc19-5fa6-4676-8e2c-cb86feedc1e7',
        lightId: '5a49c011-c955-410f-a133-58a6741e9224',
        aspectRatio: '16/9'
    },
    'python': {
        darkId: 'f0af665e-ad3a-4de9-b45a-2362051389a1',
        lightId: 'cef9a910-c75f-430f-b69e-bf798010c8a4',
        aspectRatio: '16/9'
    },
    'ruby': {
        darkId: '01483aac-60a5-4611-bc4a-c3cba9310033',
        lightId: '7ae7d7f5-9833-416f-aa3a-6c67e524de6e',
        aspectRatio: '16/9'
    }
} as const;

export type VideoKey = keyof typeof videoDictionary;