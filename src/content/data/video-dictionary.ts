
export interface VideoData {
    lightId: string;
    darkId: string;
    aspectRatio: string;
    phoneVideo?: {
        key: VideoKey;
        startTime: number;
        endTime: number;
    };
}

export const lightLibraryId = '293624';
export const lightPullZoneId = 'vz-232e9c2f-cfb';

export const darkLibraryId = '77143';
export const darkPulLZoneId = 'vz-7ada43d8-9d3';

export type VideoKey =
    | 'chrome'
    | 'javascript'
    | 'python'
    | 'ruby'
    | 'android'
    | 'android-device';

export const videoDictionary: Record<VideoKey, VideoData> = {
    'chrome': {
        darkId: 'b8291fd6-432b-40df-89ca-720609dfb6ca',
        lightId: '878ec768-abb0-40fd-b1d1-8cdce0b80c82',
        aspectRatio: '16/9',
        phoneVideo: {
            key: 'android-device',
            startTime: 58,
            endTime: 146
        }
    },
    'javascript': {
        darkId: '503b7266-ef56-4010-8056-8b74470d7b48',
        lightId: 'a6b40d19-d24f-4adb-9bd4-3107e220014a',
        aspectRatio: '16/9',
        phoneVideo: {
            key: 'android-device',
            startTime: 120,
            endTime: 211
        }
    },
    'python': {
        darkId: '8de68b4f-2e6e-4592-91e7-008d73f7dfbc',
        lightId: 'd2a1f9d1-caf4-4050-823a-9b9440b09f92',
        aspectRatio: '16/9',
        phoneVideo: {
            key: 'android-device',
            startTime: 120,
            endTime: 211
        }
    },
    'ruby': {
        darkId: '73db6190-a95a-4a59-8d18-5c2a52161dcf',
        lightId: '8711a76a-8cf8-40b3-9f56-9d6ea0ee1bd7',
        aspectRatio: '16/9',
        phoneVideo: {
            key: 'android-device',
            startTime: 120,
            endTime: 211
        }
    },
    'android': {
        darkId: '9b7bdb3b-8458-4387-a3ec-d611b65f7e2b',
        lightId: '82b7b106-4ed8-40e3-885f-61a2887c8af2',
        aspectRatio: '16/9',
        phoneVideo: {
            key: 'android-device',
            startTime: 0,
            endTime: 89
        }
    },
    'android-device': {
        darkId: 'af89b834-43a4-46c1-99dd-7e543e4c2bd8',
        lightId: '8bc4cad9-dca8-4451-8cac-0a8ba001440f',
        aspectRatio: '9/20'
    }
} as const;