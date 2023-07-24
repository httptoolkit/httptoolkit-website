import React from 'react';
import { styled, media, css } from '../styles';

import { TextInput, SubmitInput } from './form';

const PrivacyPolicy = styled.p`
    padding: 10px 0 0;
    color: ${p => p.theme.mainSubtleColor};

    font-style: italic;
    ${p => p.theme.fontSizeTinyText};

    flex-basis: 100%;
`;

const FormContainer = styled.form`
    display: flex;
    flex-wrap: wrap;

    justify-content: start;

    ${p => p.forceVertical
        ? css`
            flex-direction: column;
            flex-wrap: nowrap;
        `
        : media.mobile`
            flex-direction: column;
            flex-wrap: nowrap;
        `
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

export class EmailSignupForm extends React.Component {
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
            noValidate
        >
            <TextInput
                type="email"
                name="email"
                placeholder="Enter your email"
                title={this.props.emailTitle}
                value={this.state.enteredText}
                onChange={this.emailChanged}
                ref={(input) => { this.emailInput = input; }}
            />

            {/*
                This is the honeypot field, this should be invisible to users
                when filled in, the subscriber won't be created but will still
                receive a "successfully subscribed" page to fool spam bots.
            */}
            <div style={{position: 'absolute', left: '-9999px'}}>
                <label for="extra-info">An extra form field you should ignore</label>
                <input type="text" id="extra-info" name="first-name" tabindex="-1" autocomplete="nope" />
            </div>

            { this.props.source &&
                <input type="hidden" name="attributes[source]" value={this.props.source} />
            }

            <SubmitInput value={this.props.submitText} />
            <PrivacyPolicy>
                { this.props.privacyPolicy === undefined
                    ? 'No spam, just very occasional updates on major new releases.'
                    : this.props.privacyPolicy
                }
            </PrivacyPolicy>
        </FormContainer>
    }
}