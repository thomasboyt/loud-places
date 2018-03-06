import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'

import Subhead from './Subhead';
import { rhythm } from '../utils/typography'

class Head extends React.Component {
  render() {
    const {node} = this.props

    let inner

    if (node.excerpt) {
      inner = (
        <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
          {node.frontmatter.title}
        </Link>
      )
    } else {
      inner = node.frontmatter.title
    }

    return (
      <h3
        style={{
          marginBottom: rhythm(1 / 4),
        }}
      >
        {inner}
      </h3>
    )
  }
}

export default class PostList extends React.Component {
  render() {
    const {posts} = this.props;

    return (
      <div>
        {posts.map(({ node }) => {
          return (
            <div key={node.fields.slug}>
              <Head node={node} />
              <small>
                <Subhead frontmatter={node.frontmatter} />
              </small>
            </div>
          )
        })}
      </div>
    )
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
        }
      }
    }
  }
`
