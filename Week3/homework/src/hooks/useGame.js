import { useState, useEffect, useCallback } from "react";
import { buildDeck } from "../utils/gameUtils";
import { getLevelConfig } from "../utils/levelConfig";

export const useGame = (level) => {
  const config = getLevelConfig(level);
  const totalPairs = (config.rows * config.cols) / 2;

  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [history, setHistory] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [message, setMessage] = useState();
  const [canFlip, setCanFlip] = useState(true);

  const initializeGame = useCallback(() => {
    const deck = buildDeck(level);
    setCards(
      deck.map((card) => ({
        ...card,
        number: card.value,
        isFlipped: false,
        isMatched: false,
      }))
    );
    setFlippedCards([]);
    setMatchedPairs(0);
    setHistory([]);
    setIsGameOver(false);
    setIsWin(false);
    setMessage("카드를 눌러 게임을 시작");
    setCanFlip(true);
  }, [level]);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const handleCardClick = (cardId) => {
    if (!canFlip || isGameOver) return;

    const card = cards.find((c) => c.id === cardId);

    if (!card || card.isFlipped || card.isMatched) {
      setMessage("이미 뒤집힌 카드입니다");
      return;
    }

    // 카드 뒤집기
    const newCards = cards.map((c) =>
      c.id === cardId ? { ...c, isFlipped: true } : c
    );
    setCards(newCards);

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    // 1장만 뒤집혔을 때
    if (newFlippedCards.length === 1) {
      setMessage("1장 더 선택하세요");
      return;
    }

    // 2장이 뒤집혔을 때 매치 확인
    if (newFlippedCards.length === 2) {
      setCanFlip(false);
      const [firstId, secondId] = newFlippedCards;
      const firstCard = newCards.find((c) => c.id === firstId);
      const secondCard = newCards.find((c) => c.id === secondId);

      // 매치 성공
      if (firstCard.number === secondCard.number) {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstId || c.id === secondId
                ? { ...c, isMatched: true }
                : c
            )
          );
          setMatchedPairs((prev) => prev + 1);
          setHistory((prev) => [
            {
              cards: [firstCard.number, secondCard.number],
              isSuccess: true,
            },
            ...prev,
          ]);
          setFlippedCards([]);
          setCanFlip(true);
          setMessage("성공!");
        }, 500);
      } else {
        // 매치 실패
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstId || c.id === secondId
                ? { ...c, isFlipped: false }
                : c
            )
          );
          setHistory((prev) => [
            {
              cards: [firstCard.number, secondCard.number],
              isSuccess: false,
            },
            ...prev,
          ]);
          setFlippedCards([]);
          setCanFlip(true);
          setMessage("실패!");
        }, 700);
      }
    }
  };

  return {
    cards,
    flippedCards,
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
  };
};
