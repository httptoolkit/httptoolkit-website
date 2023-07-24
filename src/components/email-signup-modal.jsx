import * as React from 'react';

import { styled } from '../styles';
import { Modal } from './modal';
import { EmailSignupForm } from './email-signup-form';

const ModalTitle = styled.h2`
    margin-bottom: 30px;
`;

export const EmailSignupModal = (p) =>
    <Modal
        isOpen={p.isOpen}
        onClose={p.onClose}
    >
        <ModalTitle>Sign up for updates</ModalTitle>

        <EmailSignupForm
            autoFocus
            action="https://http-toolkit.mailcoach.app/subscribe/a63464bc-1d3f-4318-9229-91061d658373"
            source={p.source}
            emailTitle={`Enter your email to get updates on new releases`}
            submitText={"Sign up now"}
            forceVertical={true}
        />
    </Modal>