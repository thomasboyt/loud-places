import React from 'react'

export default class Subhead extends React.Component {
  render() {
    const { frontmatter } = this.props

    const items = [frontmatter.date]

    if (frontmatter.location) {
      items.push(frontmatter.location)
    }

    if (frontmatter.cagematch) {
      items.push(<a href={frontmatter.cagematch}>Card</a>)
    }

    return (
      <span>
        {items.map((item, idx) => {
          if (idx === items.length - 1) {
            return <span key={idx}>{item}</span>
          } else {
            return (
              <span key={idx}>
                {item}
                {' · '}
              </span>
            )
          }
        })}
      </span>
    )
  }
}

export const markdownFrontmatterFragment = graphql`
  fragment SubheadFrontmatter on MarkdownRemark {
    frontmatter {
      date(formatString: "MMMM DD, YYYY")
      location
      cagematch
    }
  }
`
