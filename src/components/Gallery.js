import React from 'react';
import { graphql } from 'gatsby';
import '../styles/flexbin.css';

const Photos = ({ photos }) => {
  if (!photos) {
    return null;
  }

  const photoJsx = photos.map((photo) => {
    const src = photo.src.childImageSharp.sizes.src;
    return (
      <a href={src} key={src}>
        <img src={src} />
      </a>
    );
  });

  return (
    <div>
      <h3>Photos</h3>
      <div className="flexbin">{photoJsx}</div>
    </div>
  );
};

const Videos = ({ videos }) => {
  if (!videos) {
    return null;
  }

  const videoJsx = videos.map((video) => {
    const src = video;
    return (
      <div className="google-video-container">
        <iframe
          allowFullScreen
          className="google-video"
          src={`https://drive.google.com/file/d/${src}/preview`}
          width="560"
          height="315"
          key={src}
        />
      </div>
    );
  });

  return (
    <div>
      <h3>Videos</h3>
      {videoJsx}
    </div>
  );
};

export default class Gallery extends React.Component {
  render() {
    return (
      <div>
        <Photos photos={this.props.photos} />
        <Videos videos={this.props.videos} />
      </div>
    );
  }
}

export const markdownFrontmatterFragment = graphql`
  fragment GalleryFrontmatter on MarkdownRemark {
    frontmatter {
      videos

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
