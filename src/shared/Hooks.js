import React, {useEffect, useState} from 'react';

/**
 * Created on 11/5/21 by lonmee
 * @param tickCallback with tick calling
 * @param interval default 1000
 */
export function useTimer(tickCallback, interval = 1000) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTick(tick + 1);
      tickCallback(tick);
    }, interval);
    return () => {
      clearInterval(intervalId);
    };
  });
}
