import React from 'react';
import styled from 'styled-components';

const EmailInput = styled.input`
    padding: 15px;
    width: 435px;

    border-radius: 4px 0 0 4px;
    border: 1px solid #1f83e0;
    box-shadow: inset 0 2px 4px 1px rgba(0, 0, 0, 0.1);
    background-color: ${p => p.theme.popBackground};

    font-family: Lato;
    font-size: ${p => p.theme.subheadingSize};
`;

const SubmitInput = styled.input`
    cursor: pointer;
    padding: 15px 36px;

    border-radius: 0 4px 4px 0;
    border: none;

    font-family: Lato;
    font-size: ${p => p.theme.subheadingSize};

    color: #fff;
    background-color: #1f83e0;

    &:hover {
        background-image: linear-gradient(transparent,rgba(0,0,0,.05) 40%,rgba(0,0,0,.1));
    }
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
        return <form
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
        </form>
    }
}