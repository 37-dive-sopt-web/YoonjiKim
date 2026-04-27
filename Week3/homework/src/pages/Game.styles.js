import styled from "@emotion/styled";

export const GameContainer = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 32px;
`;

export const GameHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  gap: 16px;
  flex-wrap: wrap;
  background-color: inherit;
`;

export const LevelSelect = styled.select`
  width: 100%;
  padding: 10px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
`;

export const ResetButton = styled.button`
  padding: 10px 20px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 16px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
`;

export const GameContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  align-items: start;
`;

export const BoardSection = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  align-items: start;
`;

export const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  justify-content: center;
  background-color: inherit;
`;

export const GameBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.cols}, 1fr);
  gap: 12px;
  margin-top: 20px;
  background-color: inherit;
`;

export const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const InfoCard = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 24px;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  margin-top: 16px;
  background-color: #fff;
`;

export const StatItem = styled.div`
  text-align: center;
  padding: 20px;
  border-radius: 8px;
  min-width: 0;
`;

export const StatLabel = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 4px;
  white-space: nowrap;
`;

export const StatValue = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  color: #1f2937;
  overflow: hidden;
  white-space: nowrap;
`;

export const FeedBackTitle = styled.h3`
  font-size: 1rem;
  margin-bottom: 12px;
  background-color: inherit;
`;

export const MessageBox = styled.div`
  border-radius: 8px;
  padding: 12px;
  text-align: center;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HistoryList = styled.div`
  margin-top: 16px;
  overflow-y: scroll; /* 세로 스크롤 */
  max-height: 160px;
  background-color: #fff;
`;

export const HistoryTitle = styled.h3`
  font-size: 1rem;
  margin-bottom: 12px;
  background-color: inherit;
`;

export const HistoryItem = styled.div`
  padding: 8px 12px;
  background-color: #fff;
  background: ${(props) => (props.isSuccess ? "#d1fae5" : "#fee2e2")};
  border-radius: 6px;
  margin-bottom: 8px;
`;

export const EmptyMessage = styled.div`
  text-align: center;
  padding: 12px;
  border-radius: 8px;
`;
