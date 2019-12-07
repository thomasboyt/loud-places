import '../styles/normalize.css';
import '../styles/loud-places.css';

import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import capitalize from '../utils/capitalize';

const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
        navCategories
      }
    }
  }
`;

class Layout extends React.Component {
  render() {
    const { location, children } = this.props;
    const { title, navCategories } = this.props.data.site.siteMetadata;

    const navItems = navCategories.map((category) => {
      return (
        <li key={category}>
          <Link to={`/${category}`}>{capitalize(category)}</Link>
        </li>
      );
    });

    const header = (
      <header>
        <div className="header-inner">
          <h1>
            <Link to={'/'}>{title}</Link>
          </h1>

          <p>This is a website where I write about places I go.</p>

          <nav>
            See: <ul>{navItems}</ul>
          </nav>
        </div>
      </header>
    );

    return (
      <div className="root">
        <div className="head-nav">{header}</div>
        <div className="right-pane">
          <div className="content">{children}</div>
        </div>
      </div>
    );
  }
}

const WrappedLayout = (props) => (
  <StaticQuery
    query={query}
    render={(data) => <Layout data={data} {...props} />}
  />
);

export default WrappedLayout;
