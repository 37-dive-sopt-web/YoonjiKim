import styled from "@emotion/styled";

export const HeaderContainer = styled.header`
  background: #c1b6ff;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.h1`
  font-size: 2rem;
  background-color: inherit;
  color: white;
  text-align: center;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  background-color: inherit;
`;

export const Button = styled.button`
  padding: 10px 24px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  background-color: ${(props) => (props.isActive ? "white" : "#d0c7ff")};
  color: ${(props) => (props.isActive ? "#a897ff" : "white")};
`;