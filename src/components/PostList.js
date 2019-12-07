import React from 'react';
import { Link, graphql } from 'gatsby';
import get from 'lodash/get';

import Subhead from './Subhead';

class Head extends React.Component {
  render() {
    const { node } = this.props;
    const hasPhotos = get(node, ['frontmatter', 'photos', 'length']) > 0;

    let inner;

    if (node.excerpt || hasPhotos) {
      inner = <Link to={node.fields.slug}>{node.frontmatter.title}</Link>;
    } else {
      inner = node.frontmatter.title;
    }

    return <h3>{inner}</h3>;
  }
}

export default class PostList extends React.Component {
  render() {
    const { posts } = this.props;

    return (
      <div className="post-list">
        {posts.map(({ node }) => {
          return (
            <div key={node.fields.slug} className="post-list-item">
              <Head node={node} />
              <Subhead frontmatter={node.frontmatter} />
            </div>
          );
        })}
      </div>
    );
  }
}

export const markdownRemarkFragment = graphql`
  fragment PostListMarkdownRemarkConnection on MarkdownRemarkConnection {
    edges {
      node {
        excerpt
        fields {
          slug
        }
        ...SubheadFrontmatter
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          photos {
            caption
          }
        }
      }
    }
  }
`;
