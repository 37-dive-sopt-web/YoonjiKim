import * as S from './Card.styles';

const Card = ({ number, isFlipped, isMatched, onClick }) => {
  return (
    <S.CardContainer onClick={onClick}>
      <S.CardTransform isFlipped={isFlipped}>
        <S.CardBack>?</S.CardBack>
        <S.CardFront isMatched={isMatched}>{number}</S.CardFront>
      </S.CardTransform>
    </S.CardContainer>
  );
};

export default Card;
