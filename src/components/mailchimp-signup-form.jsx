import React from 'react';
import { styled, media } from '../styles';

import { TextInput, SubmitInput } from './form';

const PrivacyPolicy = styled.p`
    flex-basis: 100%;
    padding: 10px 0 0;
    color: ${p => p.theme.mainSubtleColor};
`;

export default styled(class MailchimpSignupForm extends React.Component {
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
        return <form
            className={this.props.className}
            action={this.props.action}
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
                innerRef={(input) => { this.emailInput = input; }}
            />

            <div style={{position: 'absolute', left: '-5000px'}}>
                <input type="text" name={this.props.hiddenFieldName} tabIndex="-1" value="" aria-hidden="true" />
            </div>

            <SubmitInput type="submit" value={this.props.submitText} name="subscribe" />
            <PrivacyPolicy>
                No spam, just updates & early access to the very first release.
            </PrivacyPolicy>
        </form>
    }
})`
    display: flex;
    flex-wrap: wrap;

    justify-content: start;

    ${media.mobile`
        flex-direction: column;
    `}

    > input[type=submit] {
        border-radius: 0 4px 4px 0;

        ${media.mobile`
            border-radius: 0 0 4px 4px;
        `}
    }

    > input[type=email] {
        border-radius: 4px 0 0 4px;

        ${media.mobile`
            border-radius: 4px 4px 0 0;
        `}
    }
`;