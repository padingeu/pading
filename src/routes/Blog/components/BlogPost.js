import React from 'react';
import { Link } from 'react-router-dom';
import dataBlog from './dataBlog';
import './_BlogPost.scss';

export default class BlogPost extends React.Component {
  render() {
    const id = this.props.match.params.id;
    const getData = dataBlog.cardData.filter((item) => {
      return (item.id = id);
    })[0];
    return (
      <div className="blog-post">
        <div className="blog-post-content">
          <Link to="/blog">
            <i className="fas fa-arrow-circle-left fa-2x"></i>
          </Link>
          <h1>{getData.title}</h1>
          {console.log(getData)}
          <span className="blog-post-date">{getData.date}</span>
          <div className="blog-post-tags">
            {getData.tags &&
              getData.tags.map((tag, index) => {
                return (
                  <span index className={tag}>
                    #{tag}
                  </span>
                );
              })}
          </div>
          <img src={getData.img} alt={getData.img2Alt} />
          <p>{getData.description}</p>
          {getData.img2 && <img src={getData.img2} alt={getData.img2Alt} />}
          {getData.description2 && <p>{getData.description2}</p>}
        </div>
      </div>
    );
  }
}
