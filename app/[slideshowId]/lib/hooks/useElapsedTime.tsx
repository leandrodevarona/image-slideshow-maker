'use client';

import { useEffect, useState } from 'react';

export default function useElapsedTime(initialTime: number = 0) {
  const [elapsedTime, setElapsedTime] = useState(initialTime);

  const [timer, setTimer] = useState<NodeJS.Timer | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    setTimer(interval);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const clearTimer = () => {
    if (timer) {
      setTimer(null);
    }
  };

  return { elapsedTime, clearTimer };
}
