type RecognizedOperatingSystem = 'mac' | 'windows' | 'linux' | 'mobile' | 'unknown';

export function parseUserAgent(userAgent: string): RecognizedOperatingSystem {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
    return 'mobile';
  }

  let operatingSystem: RecognizedOperatingSystem = 'mac';
  if (userAgent.includes('Windows')) {
    operatingSystem = 'windows';
  } else if (userAgent.includes('Macintosh') || userAgent.includes('Mac OS')) {
    operatingSystem = 'mac';
  } else if (userAgent.includes('Linux')) {
    operatingSystem = 'linux';
  }

  return operatingSystem || 'unknown';
}
