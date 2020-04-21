import * as React from 'react';

import { styled, media, css } from '../../styles';

import { Checkmark, Cross } from './common';

const BreadcrumbContainer = styled.nav`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    ${media.desktopOrTablet`
        margin-bottom: 40px;
    `}

    ${media.mobile`
        margin-bottom: 20px;
    `}
`;

const Breadcrumb = styled((props) =>
    <div className={props.className}>
        {
            props.state === 'yes'
                ? <Checkmark />
            : props.state === 'no'
                ? <Cross />
            : null
        }
        <p>
            { props.children }
        </p>
    </div>
)`
    flex: 1 1 33%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;

    padding: 5px;
    text-align: center;

    p {
        padding: 0 5px;
    }

    ${p => p.state === 'yes' ? css`
        opacity: 0.6;
    `
    : p.state === 'no' || p.state === 'maybe' ? css`
        font-weight: bold;
    `
    : p.state === 'nvm' ? css`
        opacity: 0.5;
        text-decoration: line-through;
    `
    : ""}
`;

export const Breadcrumbs = (props) => {
    const path = props["*"];

    const safeToSend = <Breadcrumb state='tbc'>
        Is it safe to send?
    </Breadcrumb>;

    const readable = <Breadcrumb state='tbc'>
        Can the response be read?
    </Breadcrumb>;

    if ([
        'source-url',
        'target-url'
    ].includes(path)) return <BreadcrumbContainer>
        <Breadcrumb state='maybe'>
            Are you sending a CORS request?
        </Breadcrumb>
        { safeToSend }
        { readable }
    </BreadcrumbContainer>;

    if ([
        'mixed-content',
        'not-cors'
    ].includes(path)) return <BreadcrumbContainer>
        <Breadcrumb state='no'>
            Not a CORS request
        </Breadcrumb>
        <Breadcrumb state='nvm'>
            Is it safe to send?
        </Breadcrumb>
        <Breadcrumb state='nvm'>
            Can the response be read?
        </Breadcrumb>
    </BreadcrumbContainer>;

    const isCors = <Breadcrumb state='yes'>
        Sending a CORS request
    </Breadcrumb>;

    if ([
        'method',
        'request-headers',
        'content-type'
    ].includes(path)) return <BreadcrumbContainer>
        { isCors }
        <Breadcrumb state='maybe'>
            Is it safe to send?
        </Breadcrumb>
        { readable }
    </BreadcrumbContainer>;

    if ([
        'preflight',
        'preflight-response'
    ].includes(path)) return <BreadcrumbContainer>
        { isCors }
        <Breadcrumb state='maybe'>
            Does the preflight say it's safe to send?
        </Breadcrumb>
        { readable }
    </BreadcrumbContainer>;

    if (path === 'preflight-failure') return <BreadcrumbContainer>
        { isCors }
        <Breadcrumb state='no'>
            Not safe to send
        </Breadcrumb>
        <Breadcrumb state='nvm'>
            Can the response be read?
        </Breadcrumb>
    </BreadcrumbContainer>;

    const isSafeToSend = <Breadcrumb state='yes'>
        Safe to send
    </Breadcrumb>;

    if ([
        'simple-cors',
        'server-response',
        'preflight-success'
    ].includes(path)) return <BreadcrumbContainer>
        { isCors }
        { isSafeToSend }
        <Breadcrumb state='maybe'>
            Can the response be read?
        </Breadcrumb>
    </BreadcrumbContainer>;

    if (path === 'request-success') return <BreadcrumbContainer>
        { isCors }
        { isSafeToSend }
        <Breadcrumb state='yes'>
            Allowed to read the response
        </Breadcrumb>
    </BreadcrumbContainer>;

    if (path === 'request-failure') return <BreadcrumbContainer>
        { isCors }
        { isSafeToSend }
        <Breadcrumb state='no'>
            Not allowed to read the response
        </Breadcrumb>
    </BreadcrumbContainer>;

    // In any other cases (e.g. intro) show no breadcrumb
    return null;
};