import React from 'react';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContext';

const ToastWrapper = styled.div<{ $visible: boolean }>`
  position: fixed;
  bottom: 100px; /* Above BottomNav */
  left: 50%;
  transform: translateX(-50%) ${({ $visible }) => ($visible ? 'translateY(0)' : 'translateY(20px)')};
  background: rgba(255, 255, 255, 0.9);
  color: ${({ theme }) => theme.colors.textPrimary};
  padding: 14px 28px;
  border-radius: ${({ theme }) => theme.radius.full};
  font-size: 14px;
  font-weight: 500;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 1);
  z-index: ${({ theme }) => theme.zIndex.toast};
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  pointer-events: none;
  transition: all ${({ theme }) => theme.transitions.bounce};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  text-align: center;
  white-space: nowrap;
  letter-spacing: -0.5px;
`;

export function Toast() {
  const { state } = useAppContext();
  const { visible, message } = state.toast;

  return (
    <ToastWrapper $visible={visible} role="alert" aria-live="assertive">
      {message}
    </ToastWrapper>
  );
}
