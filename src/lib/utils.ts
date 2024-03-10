export const isSSR = typeof window === 'undefined';

const hasPrefix = (url = '', pattern = ['']) => {
  if (typeof url !== 'string') {
    return;
  }

  return pattern.some(prefix => url.includes(prefix));
};

export const isExternalUrl = (url: string) => {
  const regex = /^(https?:\/\/)/i;
  return regex.test(url);
};

export const isAnchor = (href: string) => {
  return hasPrefix(href, ['#']);
};

export const isUtilityLink = (href: string) =>
  hasPrefix(href, ['mailto:', 'tel:', 'callto:', 'skype:', 'sms:', 'fax:']);

// Function to shuffle the array randomly
export const shuffleArray = <T>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
