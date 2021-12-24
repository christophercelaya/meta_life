import React, {useEffect} from 'react';

/**
 * Created on 11/5/21 by lonmee
 * @param tickCallback with tick calling
 * @param interval default 1000
 */
export function useTimer(tickCallback, interval = 1000, deps = []) {
  let tick = 0;
  useEffect(() => {
    const intervalId = setInterval(() => {
      tickCallback(tick++);
    }, interval);
    console.log('useTimer -> set interval:', intervalId);
    return function () {
      clearInterval(intervalId);
      console.log('useTimer -> clear interval:', intervalId);
    };
  }, deps);
}
