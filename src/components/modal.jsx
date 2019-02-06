import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

import { styled, media } from '../styles';

export const ModalWrapper = styled.div`
    :before {
        content: ' ';

        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;

        background: radial-gradient(#40404b, #111118) rgba(34,34,40,0.8);
        z-index: 5;
        opacity: ${p => p.opacity || 0.9};
    }
`;

export const getVisibilityProps = (isModalActive, isFunctionalComponent) => ({
    'aria-hidden': isModalActive,
    'inert': isModalActive,

    // 'inert' doesn't actually work - it's non-standard, so we need this:
    [isFunctionalComponent ? 'innerRef' : 'ref']:
        node => node && (isModalActive ?
            node.setAttribute('inert', '') : node.removeAttribute('inert')
        )
});

export const Modal = styled(({ className, children, isOpen, onClose }) => isOpen && <ModalWrapper>
    <div className={className}>
        <FontAwesomeIcon icon={['far', 'times']} size='2x' onClick={onClose} />
        { children }
    </div>
</ModalWrapper>)`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);

    ${media.desktop`
        top: 20%;
    `}
    ${media.mobileOrTablet`
        top: 40px;
    `}

    border: 1px solid ${p => p.theme.containerBackground};
    border-radius: 4px;

    > [data-icon='times']:first-child {
        position: absolute;
        top: 20px;
        right: 20px;
        cursor: pointer;
    }

    > h2 {
        ${p => p.theme.fontSizeHeading};
    }

    > p {
        ${p => p.theme.fontSizeText};
        margin: 30px 0;
    }

    ${media.desktopOrTablet`
        width: 600px;
    `}

    ${media.mobile`
        width: 90%;
    `}

    padding: 50px;
    margin: 0 auto;

    z-index: 10;
    background-color: ${p => p.theme.popBackground};

    input {
        width: 100%;
    }
`;