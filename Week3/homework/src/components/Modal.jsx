import { createPortal } from 'react-dom';
import styled from '@emotion/styled';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(2px);
  animation: fadeIn 0.2s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ModalContainer = styled.div`
  background: white;
  border-radius: 16px;
  padding: 30px;
  max-width: 400px;
  width: 100%;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  padding-bottom: 12px;
  text-align: center;
`;

const Message = styled.p`
  font-size: 1rem;
  color: gray;
  text-align: center;
`;

const TimerText = styled.p`
  font-size: 1rem;
  color: #a897ff;
  text-align: center;
  padding-top: 16px;
  font-weight: 600;
`;

const Modal = ({ isOpen, title, isSuccess, message, LeftTime }) => {
  if (!isOpen) return null;

  return createPortal(
    <Overlay>
      <ModalContainer>
        <Title isSuccess={isSuccess}>{title}</Title>
        <Message isSuccess={isSuccess}>{message}</Message>
        <TimerText>{LeftTime}초 후 자동으로 새 게임을 시작해요</TimerText>
      </ModalContainer>
    </Overlay>,
    document.body
  );
};

export default Modal;