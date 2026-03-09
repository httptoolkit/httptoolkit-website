'use client';

import * as RadixAccordion from '@radix-ui/react-accordion';
import { marked } from 'marked';

import { Heading } from '@/components/elements/heading';
import { CaretDown } from '@/components/elements/icon';
import { renderer } from '@/lib/marked/link-target-render';
import { styled } from '@linaria/react';
import { fontSizes, fontWeight, screens } from '@/styles/tokens';

export interface AccordionItem {
  title: string;
  text: string;
}

export interface AccordionVariantProps {
  variant?: 'default' | 'transparent';
}

export interface AccordionProps extends AccordionVariantProps {
  items: AccordionItem[];
  isBiggerIcon?: boolean;
}

const StyledAccordionWrapper = styled(RadixAccordion.Root)`
  &&& {
    border-radius: 8px;
    width: 100%;

    &[data-variant="default"] {
      padding: 32px 16px;
      background-color: var(--ink-black);

      @media (min-width: ${screens.lg}) {
        max-width: 780px;
        padding: 32px;
      }
    }
  }
`;

const StyledAccordionItem = styled(RadixAccordion.Item)`
  &&& {
    border-bottom: 1px solid var(--dark-grey);

    &[data-variant="default"] {
      padding-top: 32px;
      padding-bottom: 32px;
    }

    &[data-variant="transparent"] {
      padding-top: 24px;
      padding-bottom: 24px;
    }

    &:first-child {
      padding-top: 0px;
    }

    &:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }
  }
`;

const StyledAccordionTrigger = styled(RadixAccordion.Trigger)`
  &&& {
    display: flex;
    justify-content: space-between;
    background-color: transparent;
    width: 100%;
    border: none;
    padding: 0;
    cursor: pointer;

    &[data-state='open'] h3 {
      color: var(--light-grey);
    }

    & svg {
      transition: transform 300ms;
      flex-shrink: 0;
    }

    &[data-state='open'] svg {
      transform: rotate(180deg);
    }
  }
`;

const StyledAccordionTransparentTitle = styled.h3`
  font-size: ${fontSizes.text.l};
  color: var(--text-light-grey);
  font-weight: ${fontWeight.bold};
  text-align: left;
  line-height: 1.5;
`;

const StyledAccordionContent = styled(RadixAccordion.Content)`
  &&& {
    overflow: hidden;

    & .accordion_content_inner {
      padding: 20px 0;
      padding-right: 48px;
    }

    & * {
      font-size: ${fontSizes.text.m};
      line-height: 1.5;
      color: var(--text-dark-grey);
    }

    & a {
      text-decoration: underline;

      &:focus {
        color: var(--light-grey);
      }

      @media (hover: hover) {
        &:hover {
          color: var(--light-grey);
        }
      }
    }

    & p:not(:last-child) {
      margin-bottom: 1.25rem;
    }

    & ul, & ol {
      list-style-position: inside;

      &:not(:last-child) {
        margin-bottom: 1.5rem;
      }
    }

    & ul {
      list-style-type: disc;
    }

    & ol {
      list-style-type: decimal;
    }

    & li:not(:last-child) {
      margin-bottom: 0.5rem;
    }

    @keyframes slideDown {
      from { height: 0; }
      to { height: var(--radix-accordion-content-height); }
    }
    @keyframes slideUp {
      from { height: var(--radix-accordion-content-height); }
      to { height: 0; }
    }

    &[data-state='open'] {
      animation: slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1);
    }
    &[data-state='closed'] {
      animation: slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1);
    }
  }
`;

const AccordionTitle = ({ variant, children }: Component<AccordionVariantProps>) => {
  if (variant === 'transparent') {
    return <StyledAccordionTransparentTitle>{children}</StyledAccordionTransparentTitle>;
  }
  return (
    <Heading as="h3" fontSize="s" color="darkGrey" textAlign="left">
      {children}
    </Heading>
  );
};

export const Accordion = ({ items, variant = 'default', isBiggerIcon }: AccordionProps) => {
  return (
    <StyledAccordionWrapper type="single" defaultValue={items[0].title} collapsible data-variant={variant}>
      {Array.isArray(items) &&
        items.length > 0 &&
        items.map((item, idx) => (
          <StyledAccordionItem key={`${item.title}-${idx}`} value={item.title} data-variant={variant}>
            <StyledAccordionTrigger>
              <AccordionTitle variant={variant}>{item.title}</AccordionTitle>
              <CaretDown weight="fill" size={isBiggerIcon ? 24 : 16} />
            </StyledAccordionTrigger>
            <StyledAccordionContent>
              <div
                className="accordion_content_inner"
                dangerouslySetInnerHTML={{ __html: marked.parse(item.text, { renderer }) as string }}
              />
            </StyledAccordionContent>
          </StyledAccordionItem>
        ))}
    </StyledAccordionWrapper>
  );
};
