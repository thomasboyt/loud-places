const _ = require('lodash');
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const isBefore = require('date-fns/isBefore');
const isAfter = require('date-fns/isAfter');
const closestIndexTo = require('date-fns/closestIndexTo');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js');
    const categoryTemplate = path.resolve('./src/templates/category.js');

    resolve(
      graphql(
        `
          {
            site {
              siteMetadata {
                navCategories
              }
            }
            allMarkdownRemark(
              sort: { fields: [frontmatter___date], order: DESC }
              limit: 1000
            ) {
              edges {
                node {
                  fields {
                    slug
                    category
                  }
                  frontmatter {
                    title
                    series
                    date
                  }
                }
              }
            }
          }
        `
      ).then((result) => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        // Create blog posts pages.
        const posts = result.data.allMarkdownRemark.edges.map(
          (edge) => edge.node
        );

        const getDate = (post) => new Date(post.frontmatter.date);
        const getSeries = (post) => post.frontmatter.series;

        const postsBySeries = _.chain(posts)
          .filter(getSeries)
          .groupBy('frontmatter.series')
          .value();

        _.each(posts, (post) => {
          const series = getSeries(post);

          let next, previous;
          if (series) {
            const postsForSeries = postsBySeries[series];
            const otherPosts = postsForSeries.filter(
              (seriesPost) => post !== seriesPost
            );

            const postDate = getDate(post);
            const afterPosts = otherPosts.filter((otherPost) =>
              isAfter(getDate(otherPost), postDate)
            );
            const beforePosts = otherPosts.filter((otherPost) =>
              isBefore(getDate(otherPost), postDate)
            );

            next =
              afterPosts[closestIndexTo(postDate, afterPosts.map(getDate))];
            previous =
              beforePosts[closestIndexTo(postDate, beforePosts.map(getDate))];
          }

          createPage({
            path: post.fields.slug,
            component: blogPost,
            context: {
              slug: post.fields.slug,
              next,
              previous,
            },
          });
        });

        // Category pages
        for (let category of result.data.site.siteMetadata.navCategories) {
          createPage({
            path: `/${category}/`,
            component: categoryTemplate,
            context: {
              category,
            },
          });
        }
      })
    );
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    // add slug to the markdown node
    const slug = createFilePath({ node, getNode });
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });

    // add category to the markdown node
    const category = slug.slice(1, -1).split('/')[0];

    createNodeField({
      node,
      name: 'category',
      value: category,
    });
  }
};
