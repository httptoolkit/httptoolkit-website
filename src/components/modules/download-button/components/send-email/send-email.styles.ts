'use client';

import { styled } from '@/styles';

export const StyledSendEmailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 12px;
  padding: 16px;
  background: ${({ theme }) => theme.colors.inkBlack};
  box-shadow:
    0 0 0 1px ${({ theme }) => theme.colors.button.border},
    0 0 8px 0 ${({ theme }) => theme.colors.shadowDefault};

  &&[data-is-in-header='true'] p {
    @media screen and (max-height: 700px) {
      &:first-child {
        display: block;
      }

      display: none;
    }
  }
`;

export const StyledSendEmailForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
