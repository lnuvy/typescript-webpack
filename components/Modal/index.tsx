import React, { FC, ReactElement, useCallback } from 'react';
import { CloseModalButton, CreateModal } from '@components/Modal/Styles';

interface Props {
  show: boolean;
  onCloseModal: () => void;
  children: ReactElement;
}

const Modal: FC<Props> = ({ show, children, onCloseModal }) => {
  const stopPropagation = useCallback((e: any) => {
    e.stopPropagation();
  }, []);

  if (!show) {
    return null;
  }
  return (
    <CreateModal onClick={onCloseModal}>
      <div onClick={stopPropagation}>
        <CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton>
        {children}
      </div>
    </CreateModal>
  );
};

export default Modal;
