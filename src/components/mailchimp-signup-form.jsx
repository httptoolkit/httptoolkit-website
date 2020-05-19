import React from 'react';
import { styled, media, css } from '../styles';

import { TextInput, SubmitInput } from './form';

const PrivacyPolicy = styled.p`
    flex-basis: 100%;
    padding: 10px 0 0;
    color: ${p => p.theme.mainSubtleColor};
`;

const FormContainer = styled.form`
    display: flex;
    flex-wrap: wrap;

    justify-content: start;

    ${p => p.forceVertical
        ? css`flex-direction: column;`
        : media.mobile`flex-direction: column;`
    }

    > input[type=email], > input[type=email] {
        flex-grow: 1;
        flex-shrink: 1;
    }

    > input[type=submit] {
        border-radius: 0 4px 4px 0;

        ${p => p.forceVertical
            ? css`border-radius: 0 0 4px 4px;`
            : media.mobile`border-radius: 0 0 4px 4px;`
        }
    }

    > input[type=email] {
        border-radius: 4px 0 0 4px;

        ${p => p.forceVertical
            ? css`border-radius: 4px 4px 0 0;`
            : media.mobile`border-radius: 4px 4px 0 0;`
        }
    }
`;

export class MailchimpSignupForm extends React.Component {
    constructor(props) {
        super(props);

        this.emailInput = null;

        this.state = {
            enteredText: ''
        };
    }

    emailChanged = (e) => {
        this.setState({ enteredText: e.target.value });
    };

    componentDidMount() {
        if (this.props.autoFocus && window.innerWidth >= 1084) {
            this.emailInput.focus();
        }
    }

    render() {
        return <FormContainer
            action={this.props.action}
            forceVertical={this.props.forceVertical}
            method="post"
            target="_blank"
            noValidate
        >
            <TextInput
                type="email"
                name="EMAIL"
                placeholder="Enter your email"
                title={this.props.emailTitle}
                value={this.state.enteredText}
                onChange={this.emailChanged}
                ref={(input) => { this.emailInput = input; }}
            />

            <div style={{position: 'absolute', left: '-5000px'}}>
                <input type="text" name={this.props.hiddenFieldName} tabIndex="-1" defaultValue="" aria-hidden="true" />
            </div>

            <SubmitInput value={this.props.submitText} name="subscribe" />
            <PrivacyPolicy>
                { this.props.privacyPolicy === undefined
                    ? 'No spam, just very occasional updates on major new releases.'
                    : this.props.privacyPolicy
                }
            </PrivacyPolicy>
        </FormContainer>
    }
}