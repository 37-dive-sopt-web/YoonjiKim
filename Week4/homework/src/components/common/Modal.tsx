import type { ReactNode } from 'react';
import Button from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, onConfirm, title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed z-50 flex items-center justify-center bg-black bg-opacity-50 inset-0">
      <div className="card w-full max-w-md mx-4">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="mb-6">{children}</div>
        <div className="flex gap-2 justify-end">
          <Button variant="cancel" onClick={onClose}>
            취소
          </Button>
          <Button variant="delete" onClick={onConfirm}>
            확인
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;