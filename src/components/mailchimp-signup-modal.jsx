import * as React from 'react';

import { styled } from '../styles';
import { Modal } from './modal';
import { MailchimpSignupForm } from './mailchimp-signup-form';

const ModalTitle = styled.h2`
    margin-bottom: 30px;
`;

export const MailchimpSignupModal = (p) =>
    <Modal
        isOpen={p.isOpen}
        onClose={p.onClose}
    >
        <ModalTitle>Sign up for updates</ModalTitle>

        <MailchimpSignupForm
            autoFocus
            action={`https://tech.us18.list-manage.com/subscribe/post?u=f6e81ee3f567741ec9800aa56&amp;id=32dc875c8b&SOURCE=${p.source}`}
            emailTitle={`Enter your email to get updates on new releases`}
            hiddenFieldName={"b_f6e81ee3f567741ec9800aa56_32dc875c8b"}
            submitText={"Sign up now"}
            forceVertical={true}
        />
    </Modal>