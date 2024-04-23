export const willItCorsSteps = [
  'source-url',
  'target-url',
  'mixed-content',
  'not-cors',
  'method',
  'request-extras',
  'content-type',
  'preflight',
  'preflight-response',
  'preflight-failure',
  'simple-cors',
  'server-response',
  'preflight-success',
  'request-success',
  'show-code',
  'request-failure',
] as const;

export type WillItCorsSteps = (typeof willItCorsSteps)[number];
