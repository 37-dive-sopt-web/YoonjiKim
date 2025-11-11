import { useState, useEffect, useRef, useCallback } from "react";

export const useTimer = (initialTime, onTimeUp) => {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const [clearTime, setClearTime] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const intervalRef = useRef(null);

  // 타이머 시작
  const startTimer = useCallback(() => {
    setIsRunning((current) => {
      if (!current) {
        setStartTime(Date.now());
        setClearTime(0);
        return true;
      }
      return current;
    });
  }, []);

  // 타이머 정지
  const stopTimer = useCallback(() => {
    setIsRunning((currentIsRunning) => {
      if (currentIsRunning && startTime) {
        setClearTime((Date.now() - startTime) / 1000);
      }
      return false;
    });

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [startTime]);

  // 타이머 리셋
  const resetTimer = useCallback(
    (newTime = initialTime) => {
      // interval 직접 정리
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      setIsRunning(false);
      setTimeRemaining(newTime);
      setStartTime(null);
      setClearTime(0);
    },
    [initialTime]
  );

  // 클리어 시간 계산
  const getClearedTime = useCallback(() => {
    if (!startTime) return clearTime;
    if (!isRunning) return clearTime;
    return (Date.now() - startTime) / 1000;
  }, [startTime, isRunning, clearTime]);

  // 타이머 실행
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 0) {
            stopTimer();
            onTimeUp?.();
            return 0;
          }
          return prev - 0.01;
        });
      }, 10);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, onTimeUp, stopTimer]);

  // initialTime 변경시 리셋
  useEffect(() => {
    // 직접 상태 업데이트
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
    setTimeRemaining(initialTime);
    setStartTime(null);
    setClearTime(0);
  }, [initialTime]); // resetTimer 제거

  return {
    timeRemaining,
    isRunning,
    startTimer,
    stopTimer,
    resetTimer,
    getClearedTime,
  };
};
