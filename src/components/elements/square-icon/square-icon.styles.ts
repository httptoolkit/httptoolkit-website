import { styled } from '@linaria/react';

export const StyledSquareIcon = styled.div`
  display: flex;
  width: fit-content;
  border-radius: 12px;
  padding: 11px;
  border: 1px solid var(--button-border);
  width: var(--icon-size);
  height: var(--icon-size);

  &[data-variant="primary"] {
    background-color: var(--ink-black);

    box-shadow:
      0px 2px 0px 0px rgba(0, 0, 0, 0.05) inset,
      0px 0px 11px 0px rgba(0, 0, 0, 0.05);

    & svg {
      color: var(--electric-blue);
      box-shadow:
        0px 2.4 1.2 0px rgba(201, 212, 251, 0.1) inset,
        0px -1.2 1.2 0px rgba(16, 46, 151, 0.1) inset,
        0px 2.4 1.2 0px rgba(201, 212, 251, 0.1) inset,
        0px -1.2 1.2 0px rgba(16, 46, 151, 0.1) inset;
    }
  }

  &[data-variant="primary"][data-size="large"] {
    border-width: 1.13px;
    border-radius: 16px;
    align-items: center;
    justify-content: center;
  }

  &[data-variant="secondary"] {
    background-color: var(--ink-grey);

    & svg {
      color: var(--light-grey);
    }
  }

  &[data-variant="darker-secondary"] {
    background-color: var(--ink-black);

    & svg {
      color: var(--light-grey);
    }
  }

  &[data-variant="tertiary"] {
    color: var(--white);
    border-radius: 8px;
    padding: 12px;
    background-color: var(--dark-grey);
    box-shadow: 0px 0px 24px 0px #8082891a inset;
  }

  &[data-variant="tertiary-bigger"] {
    color: var(--white);
    border-radius: 8px;
    padding: 15px;
    background-color: var(--dark-grey);
    box-shadow: 0px 0px 24px 0px #8082891a inset;
  }
`;
