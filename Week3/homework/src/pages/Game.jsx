import { useState, useEffect } from "react";
import Modal from "../components/Modal";

const COUNT_SECONDS = 5;

const Game = () => {
  // 모달 상태
  const [isSuccess, setIsSuccess] = useState(true); // 임시: 게임 시작시엔 null 상태
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [timeLeft, setTimeLeft] = useState(COUNT_SECONDS);

  // 임시: 게임 레벨, 클리어 시간 상태
  const [level, setLevel] = useState(1);
  const [finishTime, setFinishTime] = useState(10.52);

  useEffect(() => {
    if (!isModalOpen) return;

    if (timeLeft === 0) {
      const timerId = setTimeout(() => {
        setIsModalOpen(false);
        setTimeLeft(COUNT_SECONDS);
        setIsSuccess(null);
        // Todo: 새 게임 시작 로직
      }, 1000);

      return () => clearTimeout(timerId); // useEffect 정리
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    // 컴포넌트 언마운트 or timeLeft 변경 시 interval 정리
    return () => clearInterval(intervalId);
  }, [isModalOpen, timeLeft]);

  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        title={isSuccess ? "축하해요!!!" : "타임아웃!"}
        message={`${isSuccess ? `${level}레벨을 ${finishTime}초만에 클리어 했어요!` : "시간이 초과되었어요. 다시 도전해보세요!"}`}
        isSuccess={isSuccess}
        LeftTime={timeLeft}
      />
    </div>
  );
};

export default Game;
