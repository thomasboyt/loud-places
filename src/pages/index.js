import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import Subhead from '../components/Subhead';
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

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allMarkdownRemark.edges')

    return (
      <div>
        <Helmet title={siteTitle} />
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

export default BlogIndex

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
  }
`
