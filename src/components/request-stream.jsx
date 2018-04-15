import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import styled from 'styled-components';

function buildRequest(type, method, source, host, path, query = '', status = 200) {
    return { type, method, source, host, path, query, status };
}

const colorsByType = {
    'css': '#af4c9a',
    'html': '#574caf',
    'json': '#ffc107',
    'jsonPost': '#ce3939',
    'image': '#4caf7d'
};

const colorsBySource = {
    'android': '#a4c639',
    'chrome': '#4587F3',
    'docker': '#0db7ed'
};

const colorsByStatus = {
    200: '#4caf7d',
    202: '#4caf7d',
    304: '#ffc107',
    401: '#ce3939',
};

const titlesByStatus = {
    200: 'OK',
    202: 'Accepted',
    401: 'Unauthorized',
    304: 'Not modified',
};

const titlesBySource = {
    'docker': 'Container: a64bd7f',
    'android': '10.0.0.11: Samsung Galaxy S9',
    'chrome': 'Page URL: http://example.com',
}

export default class RequestStream extends React.Component {
    constructor(props) {
        super(props);

        this.requestInterval = null;

        this.state = {
            requestIndex: 0,
            requestsLoading: [],
            requests: [
                buildRequest('html', 'GET', 'chrome', 'example.com', '/profile', '', 200),
                buildRequest('css', 'GET', 'chrome', 'fonts.googleapis.com', '/css', 'family=Lato:300,400', 304),
                buildRequest('image', 'GET', 'chrome', 'example.com', '/images/large.png', '', 200),
                buildRequest('json', 'GET', 'docker', 'api.stripe.com', '/v1/charges', '', 200),
                buildRequest('json', 'GET', 'chrome', 'api.mixpanel.com', '/track', 'data=abcdefghabcdefghabcdefghabcdefghabcdefgh', 200),
                buildRequest('jsonPost', 'POST', 'docker', 'auth.local', '/login', '', 401),
                buildRequest('jsonPost', 'POST', 'docker', 'event-log.local', '/track', 'event=failed-login', 202),
                buildRequest('html', 'GET', 'android', 'example.com', '/profile', '', 200),
                buildRequest('jsonPost', 'POST', 'docker', 'auth.local', '/login', '', 200),
                buildRequest('jsonPost', 'POST', 'docker', 'event-log.local', '/track', 'event=successful-login', 202),
                buildRequest('css', 'GET', 'android', 'fonts.googleapis.com', '/css', 'family=Lato:300,400', 200),
                buildRequest('image', 'GET', 'android', 'example.com', '/images/large.png', '', 200),
                buildRequest('image', 'GET', 'android', 'example.com', '/images/mobile.png', '', 200),
                buildRequest('json', 'GET', 'docker', 'api.stripe.com', '/v1/charges', '', 200),
                buildRequest('json', 'GET', 'android', 'api.mixpanel.com', '/track', 'data=qweasdqweasdqweasdqweasdqweasdqweasdqwea', 200),
            ]
        };
    }

    componentDidMount() {
        this.requestInterval = setInterval(() => {
            if (this.state.requestsLoading.length > 2 || Math.random() > 0.5) {
                this.setState((state) => ({
                    requestsLoading: state.requestsLoading.slice(1)
                }));                
            }

            if (Math.random() > 0.75) {
                this.setState((state) => {
                    let newIndex = (state.requestIndex + 1) % state.requests.length;
                    return {
                        requestIndex: newIndex,
                        requestsLoading: state.requestsLoading.concat(
                            state.requests[state.requestIndex]
                        )
                    };
                });
            }
        }, 250);
    }

    componentWillUnmount() {
        clearInterval(this.requestInterval);
    }

    render() {
        let requests = this.state.requests.slice(this.state.requestIndex)
            .concat(this.state.requests.slice(0, this.state.requestIndex));

        return <RequestList className={this.props.className}>
            {requests.map((r, i) => {
                const isLoading = this.state.requestsLoading.indexOf(r) >= 0;

                return <RequestRow
                    request={r}
                    key={ (i + this.state.requestIndex) % requests.length }
                >
                    <RequestRowCell width='42px'>{r.method}</RequestRowCell>
                    <RequestRowCell
                        width='45px'
                        textAlign='center'
                        title={isLoading ? null : titlesByStatus[r.status]}
                    >
                        {
                            isLoading ?
                                <FontAwesomeIcon
                                    icon={['fal', 'spinner']}
                                    spin={true}
                                />
                            :
                                <span style={{ color: colorsByStatus[r.status] }}>
                                    {r.status}
                                </span>
                        }
                    </RequestRowCell>
                    <RequestRowCell
                        width='28px'
                        textAlign='center'
                        title={titlesBySource[r.source]}
                    >
                        <FontAwesomeIcon
                            icon={['fab', r.source]}
                            style={{ color: colorsBySource[r.source] }}/>
                    </RequestRowCell>
                    <RequestRowCell width='150px'>{r.host}</RequestRowCell>
                    <RequestRowCell width='140px'>{r.path}</RequestRowCell>
                    <RequestRowCell>{r.query}</RequestRowCell>
                </RequestRow>
            })}
        </RequestList>
    }
}

const RequestList = styled.div`
    background-color: ${p => p.theme.containerBackground};
    color: ${p => p.theme.mainColor};
    padding: 0 3px;
    font-size: 14px;
    text-align: left;
`;

const RequestRow = styled.div`
    background-color: ${p => p.theme.mainBackground};
    border-left: 5px solid ${p => colorsByType[p.request.type]};
    border-radius: 2px;

    margin: 3px 0;
`;

const RequestRowCell = styled.div`
    display: inline-block;
    padding: 6px 5px;

    width: ${p => p.width};
    text-align: ${p => p.textAlign || 'left'};
`;