import React from 'react';
import { graphql } from 'gatsby';
import get from 'lodash/get';
import Helmet from 'react-helmet';

import Layout from '../components/Layout';
import PostList from '../components/PostList';
import capitalize from '../utils/capitalize';

export default class Category extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title');
    const posts = get(this, 'props.data.allMarkdownRemark.edges');
    const category = capitalize(get(this, 'props.pageContext.category'));

    return (
      <Layout>
        <Helmet title={`${category} | ${siteTitle}`} />
        <h1>{category}</h1>
        <PostList posts={posts} />
      </Layout>
    );
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
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { category: { eq: $category } } }
    ) {
      ...PostListMarkdownRemarkConnection
    }
  }
`;
