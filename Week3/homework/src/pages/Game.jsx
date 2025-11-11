import { useState, useEffect } from "react";
import * as S from "./Game.styles";
import Modal from "../components/Modal";
import Card from "../components/Card";
import { useGame } from "../hooks/useGame";
import { useTimer } from "../hooks/useTimer";
import { saveGameRecord } from "../utils/localStorage";

// 다음 게임 시작 전까지 3초 카운트다운
const COUNT_SECONDS = 3;

const Game = () => {
  const [level, setLevel] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leftTime, setLeftTime] = useState(COUNT_SECONDS);

  const {
    cards,
    matchedPairs,
    totalPairs,
    history,
    isGameOver,
    isWin,
    message,
    handleCardClick,
    initializeGame,
    setIsGameOver,
    setIsWin,
    config,
  } = useGame(level);

  const handleTimeUp = () => {
    setIsGameOver(true);
    setIsWin(false);
    setIsModalOpen(true);
  };

  const { timeRemaining, startTimer, resetTimer, getClearedTime } = useTimer(
    config.timeLimit,
    handleTimeUp
  );

  // 카드 클릭 시 타이머 시작
  const handleCardClickWithTimer = (cardId) => {
    startTimer();
    handleCardClick(cardId);
  };

  // 모든 짝 맞추면 승리
  useEffect(() => {
    if (matchedPairs === totalPairs && totalPairs > 0 && !isGameOver) {
      const clearedTime = getClearedTime();
      setIsGameOver(true);
      setIsWin(true);
      setIsModalOpen(true);

      // 게임 기록 저장
      saveGameRecord({
        level,
        clearTime: Number(clearedTime.toFixed(2)),
      });
    }
  }, [
    matchedPairs,
    totalPairs,
    isGameOver,
    getClearedTime,
    level,
    setIsGameOver,
    setIsWin,
  ]);

  // 게임 종료 후 카운트다운 & 초기화
  useEffect(() => {
    if (!isModalOpen) return;

    if (leftTime === 0) {
      const timerId = setTimeout(() => {
        setIsModalOpen(false);
        setLeftTime(COUNT_SECONDS);
        initializeGame();
        resetTimer(config.timeLimit);
      }, 1000);

      return () => clearTimeout(timerId);
    }

    if (leftTime > 0) {
      const intervalId = setInterval(() => {
        setLeftTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [isModalOpen, leftTime, initializeGame, resetTimer, config.timeLimit]);

  // 레벨 변경 시 게임 초기화
  const handleLevelChange = (e) => {
    const newLevel = parseInt(e.target.value);
    setLevel(newLevel);
  };

  // 게임 리셋
  const handleReset = () => {
    initializeGame();
    resetTimer(config.timeLimit);
  };

  return (
    <S.GameContainer>
      <S.GameContent>
        <S.BoardSection>
          <S.GameHeader>
            <S.SectionTitle>게임 보드</S.SectionTitle>
            <S.ResetButton onClick={handleReset}>게임 리셋</S.ResetButton>
          </S.GameHeader>
          <S.GameBoard cols={config.cols}>
            {cards.map((card) => (
              <Card
                key={card.id}
                number={card.number}
                isFlipped={card.isFlipped}
                isMatched={card.isMatched}
                onClick={() => handleCardClickWithTimer(card.id)}
              />
            ))}
          </S.GameBoard>
        </S.BoardSection>

        <S.InfoSection>
          <S.InfoCard>
            <S.LevelSelect value={level} onChange={handleLevelChange}>
              <option value={1}>Level 1</option>
              <option value={2}>Level 2</option>
              <option value={3}>Level 3</option>
            </S.LevelSelect>
            <S.StatsGrid>
              <S.StatItem>
                <S.StatLabel>남은 시간</S.StatLabel>
                <S.StatValue>{timeRemaining.toFixed(2)}</S.StatValue>
              </S.StatItem>
              <S.StatItem>
                <S.StatLabel>성공한 짝</S.StatLabel>
                <S.StatValue>
                  {matchedPairs}/{totalPairs}
                </S.StatValue>
              </S.StatItem>
              <S.StatItem>
                <S.StatLabel>남은 짝</S.StatLabel>
                <S.StatValue>{totalPairs - matchedPairs}</S.StatValue>
              </S.StatItem>
            </S.StatsGrid>
          </S.InfoCard>

          <S.InfoCard>
            <S.FeedBackTitle>피드백 메세지</S.FeedBackTitle>
            <S.MessageBox>{message || "카드를 눌러 게임을 시작"}</S.MessageBox>
          </S.InfoCard>

          <S.InfoCard>
            <S.HistoryTitle>최근 히스토리</S.HistoryTitle>
            <S.HistoryList>
              {history.length === 0 ? (
                <S.EmptyMessage>아직 뒤집은 카드가 없어요</S.EmptyMessage>
              ) : (
                history.map((item, index) => (
                  <S.HistoryItem key={index} isSuccess={item.isSuccess}>
                    {item.cards.join(", ")} → {item.isSuccess ? "성공" : "실패"}
                  </S.HistoryItem>
                ))
              )}
            </S.HistoryList>
          </S.InfoCard>
        </S.InfoSection>
      </S.GameContent>

      <Modal
        isOpen={isModalOpen}
        title={isWin ? "축하해요!!!" : "타임아웃!"}
        message={
          isWin
            ? `${level}레벨을 ${getClearedTime().toFixed(2)}초만에 클리어 했어요!`
            : "시간이 초과되었어요. 다시 도전해보세요!"
        }
        isSuccess={isWin}
        leftTime={leftTime}
      />
    </S.GameContainer>
  );
};

export default Game;
