import styled from "@emotion/styled";

export const Overlay = styled.div`
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

export const ModalContainer = styled.div`
  background: white;
  border-radius: 16px;
  padding: 30px;
  max-width: 400px;
  width: 100%;
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  padding-bottom: 12px;
  text-align: center;
  background-color: #fff;
`;

export const Message = styled.p`
  font-size: 1rem;
  color: gray;
  text-align: center;
  background-color: #fff;
`;

export const TimerText = styled.p`
  font-size: 1rem;
  color: #a897ff;
  text-align: center;
  padding-top: 16px;
  font-weight: 600;
  background-color: #fff;
`;
