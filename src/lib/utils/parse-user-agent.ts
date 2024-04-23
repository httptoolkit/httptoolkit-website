export function parseUserAgent(userAgent: string) {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
    return 'mobile';
  }

  let operatingSystem = 'mac';
  if (userAgent.includes('Windows')) {
    operatingSystem = 'windows';
  } else if (userAgent.includes('Macintosh') || userAgent.includes('Mac OS')) {
    operatingSystem = 'mac';
  } else if (userAgent.includes('Linux')) {
    operatingSystem = 'linux';
  } // Add more conditions as needed
  return operatingSystem;
}
