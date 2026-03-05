import { styled } from '@linaria/react';

import { Container } from '@/components/elements/container';
import { Text } from '@/components/elements/text';
import { screens } from '@/styles/tokens';

export const StyledHeroWrapper = styled.section`
  position: relative;
  padding-top: 32px;
  padding-bottom: 64px;
  text-align: center;

  @media (min-width: ${screens['lg']}) {
    padding-top: 96px;
    padding-bottom: 64px;
  }

  &[data-footer-close="true"] {
    @media (min-width: ${screens['lg']}) {
      padding-bottom: 128px;
      margin-bottom: -64px;
    }
  }

  /* CTA SQUARE VARIANT */
  &[data-variant="cta-square"] {
    max-width: 1344px;
    margin: 32px 16px;
    padding-top: 64px;
    padding-bottom: 0;
    box-shadow: 0px 0px 24px 0px rgba(189, 195, 218, 0.1) inset;
    border-radius: 16px;
    background:
      no-repeat url('/images/backgrounds/hero-lines.svg'),
      var(--background-dots);
    background-position: top -400px center;
    border: 1px solid var(--border-dark);

    @media (min-width: ${screens['lg']}) {
      border: 0;
      padding-top: 128px;
      padding-bottom: 128px;
      margin: 96px auto;
      background-position: top -80px center;

      &::before {
        content: '';
        border: 1px solid var(--border-dark);
        border-radius: 16px;
        position: absolute;
        inset: 0;
        pointer-events: none;
        background-image: radial-gradient(ellipse at center, transparent 30%, var(--ink-grey));
      }
    }
  }

  /* Shared hero/narrow styles */
  &[data-variant="cta-hero"],
  &[data-variant="cta-narrow"] {
    box-shadow: var(--hero-box-shadow);

    @media (min-width: ${screens['md']}) {
      /* Default background */
      background:
        no-repeat url('/images/backgrounds/hero-lines.svg'),
        var(--background-dots);
      background-position: top -35px center;

      &::before {
        content: '';
        position: absolute;
        inset: 0;
        pointer-events: none;
        background-image: radial-gradient(ellipse at center, transparent 60%, var(--ink-grey));
      }
    }
  }

  /* Background variant overrides for hero/narrow */
  &[data-variant="cta-hero"][data-bg-variant="left-bottom-to-top-right"],
  &[data-variant="cta-narrow"][data-bg-variant="left-bottom-to-top-right"] {
    @media (min-width: ${screens['md']}) {
      background:
        no-repeat url(/images/backgrounds/hero-lines-2.svg),
        var(--background-dots);
      background-position: center top -388px;
    }
  }

  &[data-variant="cta-hero"][data-bg-variant="right-bottom-to-top-left"],
  &[data-variant="cta-narrow"][data-bg-variant="right-bottom-to-top-left"] {
    @media (min-width: ${screens['md']}) {
      background:
        no-repeat url(/images/backgrounds/hero-lines-4.svg),
        var(--background-dots);
      background-position: center top -340px;
    }
  }

  &[data-variant="cta-hero"][data-bg-variant="left-top-to-bottom-right"],
  &[data-variant="cta-narrow"][data-bg-variant="left-top-to-bottom-right"] {
    @media (min-width: ${screens['md']}) {
      background:
        no-repeat url(/images/backgrounds/hero-lines-3.svg),
        var(--background-dots);
      background-position: center top -310px;
    }
  }

  /* Narrow-specific: constrain container */
  &[data-variant="cta-narrow"] {
    &&& div[data-container="true"] {
      max-width: 657px;
    }
  }

  /* CTA FLUID VARIANT */
  &[data-variant="cta-fluid"] {
    background: no-repeat url('/images/backgrounds/hero-lines.svg');
    background-position: top -360px center;

    @media (min-width: ${screens['lg']}) {
      background-position: top -45px center;
    }

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      pointer-events: none;
      box-shadow: inset 0px 11px 16px 0px var(--ink-grey);
    }
  }
`;

export const StyledContainer = styled(Container)`
  &&& {
    max-width: 1280px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media (min-width: ${screens['xl']}) {
      padding-left: 0;
      padding-right: 0;
    }

    & [data-heading="true"] {
      max-width: 360px;
      line-height: 115%;
      padding-top: 11px;

      @media (min-width: ${screens['md']}) {
        max-width: 1115px;
      }
    }

    & [data-text="true"] {
      margin: 0 auto;
    }

    & [data-stack] {
      align-items: center;
    }
  }
`;

export const StyledExcerpt = styled(Text)`
  &&& {
    &[data-large-text="true"] {
      max-width: 343px;

      @media (min-width: ${screens['lg']}) {
        max-width: 659px;
        text-shadow: var(--ink-grey) 0 0 20px, var(--ink-grey) 1px 1px 1px;
      }
    }
  }
`;

export const StyledCTAWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 32px;
  margin-top: 32px;
  margin-bottom: 32px;

  @media (min-width: ${screens['lg']}) {
    flex-direction: row;
    margin-bottom: 64px;
    width: fit-content;
  }
`;
