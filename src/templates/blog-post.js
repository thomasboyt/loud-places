import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import get from 'lodash/get';

import Subhead from '../components/Subhead';
import Gallery from '../components/Gallery';

class BlogPostTemplate extends React.Component {
  // https://developers.google.com/web/fundamentals/performance/lazy-loading-guidance/images-and-video/
  componentDidMount() {
    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    const el = this.markdownContainer;

    const images = el.querySelectorAll('img');

    for (let image of images) {
      image.dataset.src = image.src;
      image.dataset.srcset = image.srcset;
      image.removeAttribute('src');
      image.removeAttribute('srcset');
      image.style.visibility = 'hidden';
    }

    this.io = new window.IntersectionObserver(
      (entries) => {
        for (let entry of entries) {
          if (entry.isIntersecting) {
            const image = entry.target;
            image.src = image.dataset.src;
            image.srcset = image.dataset.srcset;
            image.style.visibility = 'visible';
            this.io.unobserve(image);
          }
        }
      },
      { rootMargin: '200px' }
    );

    for (let image of images) {
      this.io.observe(image);
    }
  }

  componentWillUnmount() {
    if (this.io) {
      this.io.disconnect();
    }
  }

  render() {
    const post = this.props.data.markdownRemark;
    const siteTitle = get(this.props, 'data.site.siteMetadata.title');
    const { previous, next } = this.props.pathContext;

    return (
      <div>
        <Helmet title={`${post.frontmatter.title} | ${siteTitle}`} />
        <h2>{post.frontmatter.title}</h2>
        <p>
          <Subhead frontmatter={post.frontmatter} />
        </p>

        <div
          ref={(el) => {
            this.markdownContainer = el;
          }}
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        <Gallery
          photos={post.frontmatter.photos}
          videos={post.frontmatter.videos}
        />

        {next && (
          <p>
            <Link to={next.fields.slug} rel="next">
              Next: {next.frontmatter.title} →
            </Link>
          </p>
        )}
      </div>
    );
  }
}

export default BlogPostTemplate;

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
`;
