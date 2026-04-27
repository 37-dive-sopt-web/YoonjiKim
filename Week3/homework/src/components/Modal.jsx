import { createPortal } from "react-dom";
import * as S from "./Modal.styles";

const Modal = ({ isOpen, title, isSuccess, message, leftTime }) => {
  if (!isOpen) return null;

  return createPortal(
    <S.Overlay>
      <S.ModalContainer>
        <S.Title isSuccess={isSuccess}>{title}</S.Title>
        <S.Message isSuccess={isSuccess}>{message}</S.Message>
        <S.TimerText>{leftTime}초 후 자동으로 새 게임을 시작해요</S.TimerText>
      </S.ModalContainer>
    </S.Overlay>,
    document.body
  );
};

export default Modal;
