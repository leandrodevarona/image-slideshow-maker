'use client';

import { useEffect, useState } from 'react';

export default function useElapsedTime(initialTime: number = 0) {
  const [elapsedTime, setElapsedTime] = useState(initialTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return { elapsedTime, setElapsedTime };
}
