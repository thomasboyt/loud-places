import React from 'react'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import PostList from '../components/PostList';

const capitalize = (str) => str[0].toUpperCase() + str.slice(1)

export default class Category extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allMarkdownRemark.edges')
    const category = capitalize(get(this, 'props.pathContext.category'))

    return (
      <div>
        <Helmet title={`${category} | ${siteTitle}`} />
        <h1>{category}</h1>
        <PostList posts={posts} />
      </div>
    )
  }
}

export const pageQuery = graphql`
  query CategoryPage($category: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: {fields: [frontmatter___date], order: DESC },
      filter: { fields: {category: {eq: $category}} }
    ) {
      ...PostListMarkdownRemarkConnection
    }
  }
`