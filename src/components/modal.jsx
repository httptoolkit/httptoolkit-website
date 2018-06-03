import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

import { styled, media, css } from '../styles';

const ModalWrapper = styled.div`
    :before {
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        content: ' ';
        background-color: rgba(0,0,0,0.5);
        z-index: 5;
    }
`;

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
        ${p => p.theme.fontSizeHeading}
    }

    > p {
        ${p => p.theme.fontSizeText}
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