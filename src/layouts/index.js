import React from 'react'
import Link from 'gatsby-link'
import capitalize from '../utils/capitalize'

class Template extends React.Component {
  render() {
    const { location, children } = this.props
    const { title, navCategories } = this.props.data.site.siteMetadata

    const navItems = navCategories.map((category) => {
      return (
        <Link to={`/${category}`}>
          {capitalize(category)}
        </Link>
      )
    });

    const header = (
      <header>
        <h1>
          <Link to={'/'}>
            {title}
          </Link>
        </h1>

        <nav>
          {navItems}
        </nav>
      </header>
    )

    return (
      <div className="container">
        {header}
        {children()}
      </div>
    )
  }
}

export default Template

export const pageQuery = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
        navCategories
      }
    }
  }
`
