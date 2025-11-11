import { useState, useEffect, useRef } from "react";

export const useTimer = (initialTime, onTimeUp) => {  // 초기 시간 및 시간 종료 시 호출될 콜백 함수
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const [clearTime, setClearTime] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const intervalRef = useRef(null);

  // 타이머 시작
  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      setStartTime(Date.now());
      setClearTime(0);
    }
  };

  // 타이머 정지
  const stopTimer = () => {
    if (isRunning && startTime) {
      setClearTime((Date.now() - startTime) / 1000); // 클리어 시점의 시간 저장
        }
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // 타이머 리셋 (기본값: initialTime)
  const resetTimer = (newTime = initialTime) => {
    stopTimer();
    setTimeRemaining(newTime);
    setStartTime(null);
    setClearTime(0); // 클리어 시점의 시간도 초기화
  };

  // 경과 시간 계산 (초 단위)
  const getClearedTime = () => {
    if (!startTime) return clearTime; // startTime이 없으면 저장된 값 반환
    if (!isRunning) return clearTime; // 정지 상태면 저장된 값 반환
    return (Date.now() - startTime) / 1000; // 실행 중이면 실시간 계산
  };

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
  }, [isRunning, onTimeUp]);

  // initialTime 변경 시 리셋
  useEffect(() => {
    resetTimer(initialTime);
  }, [initialTime]);

  return {
    timeRemaining,
    isRunning,
    startTimer,
    stopTimer,
    resetTimer,
    getClearedTime,
  };
};