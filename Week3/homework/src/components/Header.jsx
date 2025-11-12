import * as S from "./Header.styles";

const Header = ({ activeBtn, onBtnChange }) => {
  return (
    <S.HeaderContainer>
      <S.Title>숫자 카드 짝 맞추기</S.Title>
      <S.ButtonContainer>
        <S.Button
          isActive={activeBtn === "game"}
          onClick={() => onBtnChange("game")}
        >
          게임
        </S.Button>
        <S.Button
          isActive={activeBtn === "ranking"}
          onClick={() => onBtnChange("ranking")}
        >
          랭킹
        </S.Button>
      </S.ButtonContainer>
    </S.HeaderContainer>
  );
};

export default Header;
