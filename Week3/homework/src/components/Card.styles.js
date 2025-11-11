import styled from "@emotion/styled";

export const CardContainer = styled.div`
  width: 100%;
  aspect-ratio: 1;
  perspective: 1000px;
  cursor: pointer;
  background-color: #fff;
`;

export const CardTransform = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #fff;

  transition: transform 0.5s;
  transform-style: preserve-3d;
  transform: ${(props) =>
    props.isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"};
`;

export const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  font-size: 2rem;
`;

export const CardBack = styled(CardFace)`
  background: #333;
  color: white;
`;

export const CardFront = styled(CardFace)`
  background: #c1b6ff;
  color: white;
  transform: rotateY(180deg);
`;
