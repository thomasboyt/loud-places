const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js')
    const categoryTemplate = path.resolve('./src/templates/category.js')

    resolve(
      graphql(
        `
          {
            site {
              siteMetadata {
                navCategories
              }
            }
            allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 1000) {
              edges {
                node {
                  fields {
                    slug
                    category
                  }
                  frontmatter {
                    title
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        // Create blog posts pages.
        const posts = result.data.allMarkdownRemark.edges;

        _.each(posts, (post) => {
          createPage({
            path: post.node.fields.slug,
            component: blogPost,
            context: {
              slug: post.node.fields.slug,
            },
          })
        })

        // Category pages
        for (let category of result.data.site.siteMetadata.navCategories) {
          createPage({
            path: `/${category}/`,
            component: categoryTemplate,
            context: {
              category,
            }
          })
        }
      })
    )
  })
}

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators

  if (node.internal.type === `MarkdownRemark`) {

    // add slug to the markdown node
    const slug = createFilePath({ node, getNode })
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    })

    // add category to the markdown node
    const category = slug.slice(1, -1).split('/')[0]

    createNodeField({
      node,
      name: 'category',
      value: category,
    })
  }
}
