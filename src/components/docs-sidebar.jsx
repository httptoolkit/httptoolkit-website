import * as _ from 'lodash';
import * as React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';

import { styled, media } from '../styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SidebarContainer = styled.nav`
    ${media.desktop`
        padding: 30px 40px 0 0;
    `}

    ${media.tablet`
        padding: 10px 0 30px 0;
    `}

    ${media.mobile`
        padding: 10px 20px 30px;
    `}

    flex-shrink: 0;
`;

const SidebarList = styled.ul`
    list-style: none;
`;

const SidebarItem = styled.li`
    ${p => p.theme.fontSizeText};
    color: ${p => p.theme.mainColor};
    margin-top: 10px;
`;

const GroupedLinks = styled.ul`
    list-style: none;
    margin-left: 27px;
`;

const GroupButton = styled.button`
    margin-left: -10px;

    background: none;
    border: none;
    padding: 5px 10px;

    cursor: pointer;
    &:hover {
        color: ${p => p.theme.popColor};
    }

    ${p => p.theme.fontSizeText};
    color: ${p => p.theme.mainColor};
    font-family: 'Lato';

    > svg {
        margin-right: 5px;
    }

    &:focus {
        color: ${p => p.theme.popColor};
        outline: none;
    }
`;

const SidebarGroup = styled((props) => {
    const [collapsed, setCollapsed] = React.useState(false);

    return <SidebarItem>
        <GroupButton onClick={() => setCollapsed(!collapsed)}>
            <FontAwesomeIcon icon={[
                'fas',
                collapsed ? 'chevron-down' : 'chevron-up'
            ]} /> { props.title }
        </GroupButton>
        { !collapsed && <GroupedLinks>
            { props.children }
        </GroupedLinks> }
    </SidebarItem>
})`
`

const SidebarLink = styled((props) => <SidebarItem>
    <Link
        activeClassName='active'
        {...props}
    />
</SidebarItem>)`
    text-decoration: none;
    display: block;

    &:hover {
        color: ${p => p.theme.popColor};
    }

    &.active {
        font-weight: bold;
        margin-left: -10px;
        border-left: 3px solid ${p => p.theme.popColor};
        padding-left: 7px;
    }
`;

export const DocsSidebar = () => {
    const docs = (useStaticQuery(graphql`
        query DocsQuery {
            allMarkdownRemark(
                sort: { fields: [frontmatter___name], order: ASC },
                filter: {
                    fields: { type: { eq: "docs" } }
                }
            ) {
                edges {
                    node {
                        id
                        fields {
                            slug
                        }
                        frontmatter {
                            title
                            name
                            order
                        }
                    }
                }
            }
        }
    `)).allMarkdownRemark.edges.map(e => e.node);

    const docGroups = _(docs)
        .groupBy((doc) => {
            const { slug } = doc.fields;
            const slugParts = slug.split('/');
            if (slugParts.length > 2) {
                return slug.split('/')[0];
            } else return '';
        })
        .mapValues((group) => _.sortBy(group, g => g.frontmatter.order))
        .valueOf();

    return <SidebarContainer>
        <SidebarList>
            <SidebarGroup title='Getting Started'>
                { docGroups['getting-started'].map((doc) =>
                    <SidebarLink key={doc.fields.slug} to={`/docs/${doc.fields.slug}`}>
                        { doc.frontmatter.name }
                    </SidebarLink>
                ) }
            </SidebarGroup>
            <SidebarGroup title='Reference'>
                { docGroups['reference'].map((doc) =>
                    <SidebarLink key={doc.fields.slug} to={`/docs/${doc.fields.slug}`}>
                        { doc.frontmatter.name }
                    </SidebarLink>
                ) }
            </SidebarGroup>
        </SidebarList>
    </SidebarContainer>;
}