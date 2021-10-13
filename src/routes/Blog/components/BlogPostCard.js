import React from 'react';
import { Route, Link } from 'react-router-dom';
import './_BlogPostCard.scss';

export default class BlogPostCard extends React.Component {
  render() {
    return (
      <Route>
        <Link to={this.props.link} className="blog-post-card">
          <img src={this.props.img} alt={this.props.imgAlt} />
          <div className="blog-post-card-body">
            <h5>{this.props.title}</h5>
            <div className="blog-post-card-tags">
              {this.props.tags &&
                this.props.tags.map((tag, index) => {
                  return (
                    <span index className={tag}>
                      #{tag}
                    </span>
                  );
                })}
            </div>
            <span className="blog-post-card-date">{this.props.date}</span>
          </div>
        </Link>
      </Route>
    );
  }
}
