import React from 'react';
import styled from 'styled-components';

const EmailInput = styled.input`
  padding: 10px;
  width: 300px;
  border-radius: 3px 0 0 3px;
  border: none;

  font-family: Lato;
  font-size: 14pt;
`;

const SubmitInput = styled.input`
  cursor: pointer;
  padding: 10px;

  border-radius: 0 3px 3px 0;
  border: none;

  font-family: Lato;
  font-size: 14pt;

  color: #fff;
  background-color: #0078e7;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);

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