'use client';

import { useEffect, useRef } from 'react';

export const SelfDownload = ({ releasePath }: { releasePath: string }) => {
  const prevReleasePathRef = useRef<string | null>(null);

  useEffect(() => {
    if (releasePath !== prevReleasePathRef.current) {
      // Trigger a download of the app
      const iframe = document.createElement('iframe');
      iframe.src = `https://github.com/httptoolkit/httptoolkit-desktop/releases/download/${releasePath}`;
      iframe.style.display = 'none';
      document.body.appendChild(iframe);

      // Update the previous releasePath value
      prevReleasePathRef.current = releasePath;
    }
  }, [releasePath]);

  return null;
};
