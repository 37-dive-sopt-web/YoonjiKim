import styled from "@emotion/styled";

const HeaderContainer = styled.header`
  background: #c1b6ff;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-size: 2rem;
  background-color: inherit;
  color: white;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  background-color: inherit;
`;

const Button = styled.button`
  padding: 10px 24px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  background-color: ${(props) => (props.isActive ? "white" : "#d0c7ff")};
  color: ${(props) => (props.isActive ? "#a897ff" : "white")};
`;

const Header = ({ activeBtn, onBtnChange }) => {
  return (
    <HeaderContainer>
      <Title>숫자 카드 짝 맞추기</Title>
      <ButtonContainer>
        <Button
          isActive={activeBtn === "game"}
          onClick={() => onBtnChange("game")}
        >
          게임
        </Button>
        <Button
          isActive={activeBtn === "ranking"}
          onClick={() => onBtnChange("ranking")}
        >
          랭킹
        </Button>
      </ButtonContainer>
    </HeaderContainer>
  );
};

export default Header;
