import { useState, useEffect } from "react";
import * as S from "./Ranking.styles";
import { getGameRecords, clearGameRecords } from "../utils/localStorage";


const Ranking = () => {
  const [records, setRecords] = useState([]);

  // 게임 기록 불러오기
  const loadRecords = () => {
    const savedRecords = getGameRecords();

    // 레벨 내림차순, 같은 레벨이면 클리어 시간 오름차순으로 정렬
    const sortedRecords = savedRecords.sort((a, b) => {
      if (a.level !== b.level) {
        return b.level - a.level; // 레벨 내림차순
      }
      return a.clearTime - b.clearTime; // 시간 오름차순
    });

    setRecords(sortedRecords);
  };

  useEffect(() => {
    loadRecords();
  }, []);

  // 기록 초기화 핸들러

  const handleClearRecords = () => {
    if (window.confirm("정말로 모든 기록을 삭제하시겠습니까?")) {
      clearGameRecords();
      setRecords([]);
    }
  };

  /**
   * 날짜 포맷팅 함수
   * @param {string} timestamp - ISO 형식의 타임스탬프
   * @returns {string} - 포맷된 날짜 문자열
   */
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  return (
    <S.RankingContainer>
      <S.RankingHeader>
        <S.Title>랭킹 보드</S.Title>
        <S.ClearButton onClick={handleClearRecords}>기록 초기화</S.ClearButton>
      </S.RankingHeader>

      <S.RankingTable>
        <S.TableHeader>
          <S.Cell>순위</S.Cell>
          <S.Cell>일시</S.Cell>
          <S.Cell>레벨</S.Cell>
          <S.Cell>클리어 시간</S.Cell>
        </S.TableHeader>

        {records.length === 0 ? (
            <S.EmptyText>
              아직 기록이 없습니다.
              <br />
              게임을 클리어하고 랭킹에 도전하세요!
            </S.EmptyText>
        ) : (
          records.map((record, index) => (
            <S.TableRow key={index}>
              <S.Cell>
                <S.RankGrade rank={index + 1}>{index + 1}</S.RankGrade>
              </S.Cell>
              <S.Cell>{formatDate(record.timestamp)}</S.Cell>
              <S.Cell highlight>Level {record.level}</S.Cell>
              <S.Cell highlight>{record.clearTime.toFixed(2)}초</S.Cell>
            </S.TableRow>
          ))
        )}
      </S.RankingTable>
    </S.RankingContainer>
  );
};

export default Ranking;