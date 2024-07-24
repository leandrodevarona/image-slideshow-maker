'use client';

import { useEffect, useState } from 'react';

export default function useElapsedTime(
  initialTime: number = 0,
  pause: boolean = false
) {
  const [elapsedTime, setElapsedTime] = useState(initialTime);

  useEffect(() => {
    const interval = setInterval(() => {
      if (pause) return;
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [pause]);

  return { elapsedTime, setElapsedTime };
}
