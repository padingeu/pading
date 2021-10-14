import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../../../components/NavBar';
import Footer from '../../../components/Footer';
import dataBlog from './dataBlog';
import './_BlogPost.scss';

export default class BlogPost extends React.Component {

  scrollUp = () => {
    document.scrollingElement.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  render() {
    console.log(this.props)
    const getId = this.props.match.params.id;
    const getData = dataBlog.cardData.filter((item) => {
      return (item.id = getId);
    })[0];
    return (
      <div>
        <NavBar scrollUp={this.scrollUp} />
        <div className="blog-post">
          <div className="blog-post-content">
            <Link to="/blog">
              <i className="fas fa-arrow-circle-left fa-2x"></i>
            </Link>
            <h1>{getData.title}</h1>
            <span className="blog-post-date">{getData.date}</span>
            <div className="blog-post-tags">
              {getData.tags &&
                getData.tags.map((tag, index) => {
                  return (
                    <span key={index} className={tag}>
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
        <Footer scrollUp={this.scrollUp} />
      </div>
    );
  }
}
