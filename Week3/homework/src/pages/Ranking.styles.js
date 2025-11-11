import styled from "styled-components";

export const RankingContainer = styled.div`
  max-width: 800px;
  margin: 30px auto;
  padding: 32px;
  background-color: #fff;
  border-radius: 16px;
`;

export const RankingHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  background-color: inherit;
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
  background-color: inherit;
`;

export const ClearButton = styled.button`
  padding: 10px 20px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 16px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
`;

export const RankingTable = styled.div`
  background: white;
  border-radius: 16px;
  overflow: hidden;
`;

export const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 80px 400px 100px 120px;
  padding: 16px 20px;
  background:  #c1b6ff;
  color: white;
  font-weight: 600;
  font-size: 0.875rem;
`;

export const TableRow = styled.div`
  display: grid;
  grid-template-columns: 60px 1fr 100px 120px;
  padding: 16px 20px;
  border-bottom: 1px solid #e5e7eb;
  transition: background-color 0.2s;
`;

export const Cell = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  color: ${(props) => (props.highlight ? "#a897ff" : "#1f2937")};
  font-weight: ${(props) => (props.highlight ? "600" : "400")};
  background-color: transparent;
`;

export const RankGrade = styled.div`
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
`;


export const EmptyText = styled.p`
  padding: 40px 20px;
  text-align: center;
`;
