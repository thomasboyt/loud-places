import React from 'react'
import '../styles/flexbin.css';

export default class Gallery extends React.Component {
  render() {
    const {photos} = this.props;

    if (!photos) {
      return null;
    }

    const photoJsx = photos.map((photo) => {
      const src = photo.src.childImageSharp.sizes.src;
      return (
        <a href={src} key={src}>
          <img src={src} />
        </a>
      )
    })

    return (
      <div className="flexbin">
        {photoJsx}
      </div>
    )
  }
}

export const markdownFrontmatterFragment = graphql`
  fragment PhotosFrontmatter on MarkdownRemark {
    frontmatter {
      photos {
        src {
          childImageSharp {
            sizes(maxWidth: 1000) {
              src
            }
          }
        }
      }
    }
  }
`;