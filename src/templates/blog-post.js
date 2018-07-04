import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import get from 'lodash/get'

import Subhead from '../components/Subhead'
import Gallery from '../components/Gallery'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const { previous, next } = this.props.pathContext

    return (
      <div>
        <Helmet title={`${post.frontmatter.title} | ${siteTitle}`} />
        <h2>{post.frontmatter.title}</h2>
        <p>
          <Subhead frontmatter={post.frontmatter} />
        </p>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />

        <Gallery photos={post.frontmatter.photos} videos={post.frontmatter.videos} />

          {next && (
            <p>
              <Link to={next.fields.slug} rel="next">
                Next: {next.frontmatter.title} →
              </Link>
            </p>
          )}
      </div>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      ...SubheadFrontmatter
      ...GalleryFrontmatter
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
