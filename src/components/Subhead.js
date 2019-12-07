import React from 'react';
import { graphql } from 'gatsby';

export default class Subhead extends React.Component {
  getCagematch(frontmatter) {
    if (frontmatter.cagematch) {
      return <a href={frontmatter.cagematch}>Card</a>;
    }

    if (frontmatter.cagematch_list) {
      const cards = frontmatter.cagematch_list.map((cardLink, i) => (
        <span key={cardLink}>
          <a href={cardLink} key={cardLink}>
            [{i + 1}]
          </a>{' '}
        </span>
      ));
      return <span>Cards: {cards}</span>;
    }

    return null;
  }

  render() {
    const { frontmatter } = this.props;

    const items = [];

    if (frontmatter.end_date) {
      items.push(`${frontmatter.date} - ${frontmatter.end_date}`);
    } else {
      items.push(frontmatter.date);
    }

    if (frontmatter.location) {
      items.push(frontmatter.location);
    }

    // class just for scraping purposes
    const cagematch = this.getCagematch(frontmatter);
    if (cagematch) {
      items.push(<span className="cagematch">{cagematch}</span>);
    }

    return (
      <span>
        {items.map((item, idx) => {
          if (idx === items.length - 1) {
            return <span key={idx}>{item}</span>;
          } else {
            return (
              <span key={idx}>
                {item}
                {' · '}
              </span>
            );
          }
        })}
      </span>
    );
  }
}

export const markdownFrontmatterFragment = graphql`
  fragment SubheadFrontmatter on MarkdownRemark {
    frontmatter {
      date(formatString: "MMMM DD, YYYY")
      end_date(formatString: "MMMM DD, YYYY")
      location
      cagematch
      cagematch_list
    }
  }
`;
