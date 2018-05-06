import React from 'react';
import { styled, media } from '../styles';

const Form = styled.form`
    display: flex;
    flex-wrap: wrap;

    justify-content: start;

    ${media.mobile`
        flex-direction: column;
    `}
`;

const EmailInput = styled.input`
    padding: 15px;

    ${media.desktopOrTablet`
        width: 435px;
    `}

    border-radius: 4px 0 0 4px;
    ${media.mobile`
        border-radius: 4px 4px 0 0;
    `}

    border: 1px solid #1f83e0;
    box-shadow: inset 0 2px 4px 1px rgba(0, 0, 0, 0.1);
    background-color: ${p => p.theme.popBackground};

    font-family: Lato;
    ${p => p.theme.fontSizeSubheading};
`;

const SubmitInput = styled.input`
    cursor: pointer;
    padding: 15px 36px;

    border-radius: 0 4px 4px 0;

    ${media.mobile`
        border-radius: 0 0 4px 4px;
    `}

    border: none;

    font-family: Lato;
    ${p => p.theme.fontSizeSubheading};

    color: #fff;
    background-color: #1f83e0;

    &:hover {
        background-image: linear-gradient(transparent,rgba(0,0,0,.05) 40%,rgba(0,0,0,.1));
    }
`;

const PrivacyPolicy = styled.p`
    flex-basis: 100%;
    padding: 10px 0 0;
    color: ${p => p.theme.mainSubtleColor};
`;

export default class MailchimpSignupForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            enteredText: ''
        };
    }

    emailChanged = (e) => {
        this.setState({ enteredText: e.target.value });
    };

    render() {
        return <Form
            className={this.props.className}
            action={this.props.action}
            method="post"
            target="_blank"
            noValidate
        >
            <EmailInput
                autoFocus={this.props.autoFocus}
                type="email"
                name="EMAIL"
                placeholder="Enter your email"
                title={this.props.emailTitle}
                value={this.state.enteredText}
                onChange={this.emailChanged}
            />

            <div style={{position: 'absolute', left: '-5000px'}}>
                <input type="text" name={this.props.hiddenFieldName} tabIndex="-1" value="" aria-hidden="true" />
            </div>

            <SubmitInput type="submit" value={this.props.submitText} name="subscribe" />
            <PrivacyPolicy>
                No spam, just updates & early access to the very first release.
            </PrivacyPolicy>
        </Form>
    }
}