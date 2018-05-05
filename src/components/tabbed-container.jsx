import React from 'react';
import { styled } from '../styles';

const Tabs = styled.div`
    display: flex;
`;

const TabButton = styled.button`
    flex: 1;
    padding: 10px;

    border: none;
    border-top: 1px solid ${p => p.theme.containerBorder};

    background-color: ${p => p.theme.popBackground };
    cursor: pointer;

    font-weight: bold;

    &:disabled {
        font-weight: lighter;
        color: #888;
        cursor: not-allowed;
    }

    &.selected {
        border-top: 3px solid ${p => p.theme.popColor};
        padding-top: 8px;
    }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;

    > :not(${Tabs}) {
        flex: 1;
    }
`;

export default class TabbedContainer extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            selected: props.defaultSelection
        };
    }

    render() {
        const {
            children: tabs,
            tabNameFormatter = ((x) => x),
            className
        } = this.props;

        const options = Object.keys(tabs);
        const currentTab = tabs[this.state.selected];

        return <Container className={className}>
            { currentTab }
            <Tabs>
                { options.map((option) => <TabButton
                    key={option}
                    disabled={!tabs[option]}
                    className={option === this.state.selected && 'selected'}
                    onClick={() => this.setState({ selected: option })}
                >
                    {tabNameFormatter(option)}
                </TabButton>) }
            </Tabs>
        </Container>
    }
}