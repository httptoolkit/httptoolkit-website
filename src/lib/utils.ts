export const isSSR = typeof window === 'undefined';

export const isExternalUrl = (url: string) => {
  const regex = /^(https?:\/\/)/i;
  return regex.test(url);
};
